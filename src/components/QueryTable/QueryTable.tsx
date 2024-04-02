import {
  useCallback,
  useContext,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
} from "react";
import { Table, TableProps } from "antd";
import QueryContext from "./content";
import { AxiosResponse } from "axios";
import { handleTree } from "@/utils/baize";

export type IQueryTableRefProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reload: (type?: string) => Promise<void>;
};

interface IQueryTableProps extends TableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryFn: (params: any) => Promise<AxiosResponse>;
  isRowSelection?: boolean;
  isPagination?: boolean;
  authQuery?: boolean;
  isTree?: boolean;
  idkey?: string;
}

const QueryTable = forwardRef(
  (
    {
      queryFn,
      authQuery = true,
      isTree,
      isPagination,
      isRowSelection,
      idkey,
      ...ret
    }: IQueryTableProps,
    ref: ForwardedRef<IQueryTableRefProps>,
  ) => {
    const {
      params,
      selectedRowKeys,
      setSelectedRowKeys,
      setSelectedRows,
      handleSetGetList,
    } = useContext(QueryContext);
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [total, setTotal] = useState(0);
    // const totalRef = useRef(0);
    // const [isPagination, setIsPagination] = useState(false);
    // const isPaginationRef = useRef(false);

    // 表格请求参数，依赖外部传入
    const getList = useCallback(
      async (type?: string) => {
        try {
          setLoading(true);
          const _params = {
            ...params,
            ...(isPagination && {
              pageNum: page,
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
        rowSelection={isRowSelection ? rowSelection : undefined}
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
