import Query from "./Query";
import QueryForm from "./QueryForm";
import QueryTable, { IQueryTableRefProps } from "./QueryTable";
import Toolbar from "./Toolbar";
import useQueryTable from "./useQueryTable";

type IQueryTableProps = {
  Form: typeof QueryForm;
  Table: typeof QueryTable;
  Toolbar: typeof Toolbar;
  useQueryTable: typeof useQueryTable;
} & typeof Query;

const _Query = Query as unknown as IQueryTableProps;

_Query.Form = QueryForm;
_Query.Table = QueryTable;
_Query.Toolbar = Toolbar;
_Query.useQueryTable = useQueryTable;

export default _Query;

export type { IQueryTableRefProps };
