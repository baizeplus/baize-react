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
  queryFn: (params: any) => Promise<AxiosResponse>;
  isRowSelection?: boolean;
  isTree?: boolean;
  idkey?: string;
}

const QueryTable = forwardRef(
  (
    { queryFn, isTree, isRowSelection, idkey, ...ret }: IQueryTableProps,
    ref: ForwardedRef<IQueryTableRefProps>,
  ) => {
    const { params, selectedRowKeys, setSelectedRowKeys, queryFnRef } =
      useContext(QueryContext);
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [total, setTotal] = useState(0);

    // 表格请求参数，依赖外部传入
    const getList = useCallback(
      async (type?: string) => {
        try {
          setLoading(true);
          const _params = {
            ...params,
          };
          const { data } = await queryFn(_params);
          setTimeout(() => {
            if (type === "del") {
              setSelectedRowKeys([]);
            }
            const list = Array.isArray(data) ? data : data.rows;
            setDataSource(isTree ? handleTree(list, idkey, "parentId") : list);
            setTotal(data.total);
          }, 14);
        } finally {
          setLoading(false);
        }
      },
      [idkey, isTree, params, queryFn, setSelectedRowKeys],
    );

    useEffect(() => {
      if (queryFnRef) {
        queryFnRef.current = getList;
      }
    }, [getList, queryFnRef]);

    useImperativeHandle(ref, () => ({
      reload: getList,
    }));

    useEffect(() => {
      getList();
    }, [getList]);

    const handleSelectChange = (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
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
          showTotal: (total) => `共 ${total} 条`,
          total: total,
        }}
        {...ret}
      />
    );
  },
);

export default QueryTable;
