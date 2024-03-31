import { useContext } from "react";
import QueryContext from "./content";

export default function useQueryTable() {
  const { queryFn, selectedRowKeys, selectedRows, setParams } =
    useContext(QueryContext);

  return {
    queryFn: queryFn,
    selectedRowId: selectedRowKeys,
    selectedRows,
    setParams,
  };
}
