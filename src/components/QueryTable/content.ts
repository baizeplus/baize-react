import { Dispatch, SetStateAction, createContext } from "react";

interface IQueryContext {
  params: object;
  setParams: (params: object) => void;
  hideSearch: boolean;
  setHideSearch: (params: boolean) => void;
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: Dispatch<SetStateAction<React.Key[]>>;
  selectedRows: unknown[];
  setSelectedRows: Dispatch<SetStateAction<unknown[]>>;
  handleSetGetList: (fn: (type?: string) => Promise<void>) => void;
  queryFn?: (type?: string) => Promise<void>;
}

const QueryContext = createContext<IQueryContext>({
  params: {},
  setParams: () => void 0,
  hideSearch: false,
  setHideSearch: () => void 0,
  selectedRowKeys: [],
  setSelectedRowKeys: () => void 0,
  selectedRows: [],
  setSelectedRows: () => void 0,
  handleSetGetList: () => Promise.reject(),
  queryFn: undefined,
});

export default QueryContext;
