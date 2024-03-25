import { FC, useCallback, useContext, useEffect, useState } from "react";
import { Table, TableProps } from "antd";
import QueryContext from "./content";
import { AxiosResponse } from "axios";
import { handleTree } from "@/utils/baize";

interface IQueryTableProps extends TableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryFn: (params: any) => Promise<AxiosResponse>;
  isRowSelection?: boolean;
  isTree?: boolean;
}

const QueryTable: FC<IQueryTableProps> = ({
  queryFn,
  isTree,
  isRowSelection,
  ...ret
}) => {
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
          setDataSource(isTree ? handleTree(list, "menuId", "parentId") : list);
          setTotal(data.total);
        }, 14);
      } finally {
        setLoading(false);
      }
    },
    [isTree, params, queryFn, setSelectedRowKeys],
  );

  useEffect(() => {
    if (queryFnRef) {
      queryFnRef.current = getList;
    }
  }, [getList, queryFn, queryFnRef]);

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
};

export default QueryTable;
