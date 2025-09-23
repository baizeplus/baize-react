import { FC, useCallback, useState } from "react";
import { TableProps } from "antd";
import QueryContext from "./content";

export type IQueryProps = {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any;
};

const Query: FC<IQueryProps> = ({ children }) => {
  const [params, setParams] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<unknown[]>([]);
  const [hideSearch, setHideSearch] = useState(false);
  const [queryFn, setQueryFn] = useState<(type?: string) => Promise<void>>();

  // 列显隐功能状态
  const [allColumns, setAllColumns] = useState<TableProps<any>["columns"]>([]);
  const [visibleColumnKeys, setVisibleColumnKeys] = useState<string[]>([]);
  const [enableColumnVisibility, setEnableColumnVisibility] = useState(false);

  const handleSetGetList = useCallback(
    (fn: (type?: string) => Promise<void>) => {
      // queryFnRef.current = fn
      setQueryFn(() => fn);
    },
    [],
  );

  return (
    <QueryContext.Provider
      value={{
        params,
        setParams,
        selectedRowKeys,
        setSelectedRowKeys,
        setSelectedRows,
        selectedRows,
        hideSearch,
        setHideSearch,
        handleSetGetList,
        queryFn,
        // 列显隐功能
        allColumns,
        setAllColumns,
        visibleColumnKeys,
        setVisibleColumnKeys,
        enableColumnVisibility,
        setEnableColumnVisibility,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export default Query;
