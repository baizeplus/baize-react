import { useContext } from "react";
import QueryContext from "./content";

export default function useQueryTable() {
  const { queryFnRef, selectedRowKeys } = useContext(QueryContext);

  return { queryFn: queryFnRef?.current, selectedRowId: selectedRowKeys };
}
