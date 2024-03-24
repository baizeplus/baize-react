import { FC, useRef, useState } from "react";
import QueryContext from "./content";

export type IQueryProps = {
  children: React.ReactNode;
};

const Query: FC<IQueryProps> = ({ children }) => {
  const [params, setParams] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [hideSearch, setHideSearch] = useState(false);
  const queryFnRef = useRef();

  return (
    <QueryContext.Provider
      value={{
        params,
        setParams,
        selectedRowKeys,
        setSelectedRowKeys,
        hideSearch,
        setHideSearch,
        queryFnRef,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export default Query;
