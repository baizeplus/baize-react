import { FC, useCallback, useState } from "react";
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
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export default Query;
