import {
  useCallback,
  useContext,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
  useRef,
  useMemo,
} from "react";
import { Table, TableProps } from "antd";
import QueryContext from "./content";
import { AxiosResponse } from "axios";
import { handleTree } from "@/utils/baize";

export type IQueryTableRefProps = {
  reload: (type?: string) => Promise<void>;
};

interface IQueryTableProps<T = any> extends TableProps<T> {
  queryFn: (params: any) => Promise<AxiosResponse>;
  isRowSelection?: boolean;
  isPagination?: boolean;
  authQuery?: boolean;
  isTree?: boolean;
  idkey?: string;
  enableColumnVisibility?: boolean;
}

const QueryTable = forwardRef<IQueryTableRefProps, IQueryTableProps<any>>(
  (
    {
      queryFn,
      authQuery = true,
      isTree,
      isPagination,
      isRowSelection,
      idkey,
      enableColumnVisibility = false,
      columns,
      ...ret
    }: IQueryTableProps<any>,
    ref: ForwardedRef<IQueryTableRefProps>,
  ) => {
    const {
      params,
      selectedRowKeys,
      setSelectedRowKeys,
      setSelectedRows,
      handleSetGetList,
      allColumns,
      setAllColumns,
      visibleColumnKeys,
      setVisibleColumnKeys,
      setEnableColumnVisibility,
    } = useContext(QueryContext);
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [total, setTotal] = useState(0);
    const totalRef = useRef(0);
    const isInitialized = useRef(false);

    // 使用 useMemo 来稳定 columns 引用
    const stableColumns = useMemo(() => columns, [JSON.stringify(columns)]);

    // 初始化列显隐功能
    useEffect(() => {
      setEnableColumnVisibility(enableColumnVisibility);
      if (enableColumnVisibility && stableColumns && !isInitialized.current) {
        setAllColumns(stableColumns);
        // 只在第一次初始化时设置所有列为可见状态，排除固定列
        const initialVisibleKeys = stableColumns
          .filter(
            (col) =>
              col &&
              (col.key || ("dataIndex" in col ? col.dataIndex : undefined)) &&
              !col.fixed,
          )
          .map(
            (col) =>
              (col.key ||
                ("dataIndex" in col ? col.dataIndex : undefined)) as string,
          );
        setVisibleColumnKeys(initialVisibleKeys);
        isInitialized.current = true;
      }
    }, [
      enableColumnVisibility,
      stableColumns,
      setAllColumns,
      setVisibleColumnKeys,
      setEnableColumnVisibility,
    ]);

    // 根据可见列过滤columns，固定列始终显示
    const filteredColumns =
      enableColumnVisibility && allColumns
        ? allColumns.filter((col) => {
            const key = (col?.key ||
              ("dataIndex" in col ? col.dataIndex : undefined)) as string;
            // 固定列始终显示，或者在可见列列表中
            return col?.fixed || visibleColumnKeys.includes(key);
          })
        : columns;

    // 表格请求参数，依赖外部传入
    const getList = useCallback(
      async (type?: string) => {
        try {
          let _page = page;
          // 计算删除数据为空自动退后page
          if (type === "del" && totalRef.current > 1) {
            _page =
              Math.ceil((totalRef.current - 1) / size) < page ? page - 1 : page;
            if (_page !== page) {
              return setPage(_page);
            }
          }
          setLoading(true);
          const _params = {
            ...params,
            ...(isPagination && {
              pageNum: _page,
              pageSize: size,
            }),
          };
          const { data } = await queryFn(_params);
          setTimeout(() => {
            if (type === "del") {
              setSelectedRowKeys([]);
            }
            const list = Array.isArray(data) ? data : data?.rows || [];
            setDataSource(isTree ? handleTree(list, idkey, "parentId") : list);
            if (!isTree) {
              setTotal(data?.total || list.length);
              totalRef.current = data?.total || list.length;
            }
          }, 14);
        } finally {
          setLoading(false);
        }
      },
      [
        page,
        size,
        params,
        isPagination,
        queryFn,
        isTree,
        idkey,
        setSelectedRowKeys,
      ],
    );

    useEffect(() => {
      handleSetGetList(getList);
    }, [getList, handleSetGetList]);

    useImperativeHandle(ref, () => ({
      reload: getList,
    }));

    useEffect(() => {
      if (authQuery) {
        getList();
      }
    }, [authQuery, getList]);

    useEffect(() => {
      return () => {
        setSelectedRowKeys([]);
        setSelectedRows([]);
      };
    }, [setSelectedRowKeys, setSelectedRows]);

    const handleSelectChange = (
      newSelectedRowKeys: React.Key[],
      newSelectedRow: unknown[],
    ) => {
      setSelectedRowKeys(newSelectedRowKeys);
      setSelectedRows(newSelectedRow);
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: handleSelectChange,
    };

    return (
      <Table
        loading={loading}
        dataSource={dataSource}
        columns={filteredColumns}
        rowSelection={isRowSelection ? rowSelection : undefined}
        scroll={{ x: true }}
        pagination={{
          ...(!isTree && { showTotal: (total) => `共 ${total} 条` }),
          total: total,
          ...(isPagination && {
            pageSize: size,
            current: page,
            onChange(page, pageSize) {
              console.log("page", page, "pageSize", pageSize);
              setPage(page);
              setSize(pageSize);
            },
          }),
        }}
        {...ret}
      />
    );
  },
);

export default QueryTable;
