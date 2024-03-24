import { Dispatch, SetStateAction, createContext } from "react";

interface IQueryContext {
  params: object;
  queryFnRef?: { current?: (type?: string) => Promise<void> };
  setParams: (params: object) => void;
  hideSearch: boolean;
  setHideSearch: (params: boolean) => void;
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: Dispatch<SetStateAction<React.Key[]>>;
}

const QueryContext = createContext<IQueryContext>({
  params: {},
  setParams: () => void 0,
  hideSearch: false,
  setHideSearch: () => void 0,
  selectedRowKeys: [],
  setSelectedRowKeys: () => void 0,
  queryFnRef: { current: undefined },
});

export default QueryContext;
