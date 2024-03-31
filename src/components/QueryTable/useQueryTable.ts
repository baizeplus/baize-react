import { useContext } from "react";
import QueryContext from "./content";

export default function useQueryTable() {
  const { queryFn, selectedRowKeys } = useContext(QueryContext);

  return { queryFn: queryFn, selectedRowId: selectedRowKeys };
}
