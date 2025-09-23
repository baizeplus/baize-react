import { Dispatch, SetStateAction, createContext } from "react";
import { TableProps } from "antd";

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
  // 列显隐功能
  allColumns: TableProps<any>["columns"];
  setAllColumns: Dispatch<SetStateAction<TableProps<any>["columns"]>>;
  visibleColumnKeys: string[];
  setVisibleColumnKeys: Dispatch<SetStateAction<string[]>>;
  enableColumnVisibility: boolean;
  setEnableColumnVisibility: (enable: boolean) => void;
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
  // 列显隐功能默认值
  allColumns: [],
  setAllColumns: () => void 0,
  visibleColumnKeys: [],
  setVisibleColumnKeys: () => void 0,
  enableColumnVisibility: false,
  setEnableColumnVisibility: () => void 0,
});

export default QueryContext;
