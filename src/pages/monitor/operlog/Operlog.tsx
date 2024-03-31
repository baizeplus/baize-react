import { FC } from "react";
import { Card } from "antd";

import Query from "@/components/QueryTable";
import TableSearchForm from "./components/TableSearchForm";
import OperlogToolbar from "./components/OperlogToolbar";
import OperlogTable from "./components/OperlogTable";

const Operlog: FC = () => {
  return (
    <Query>
      <TableSearchForm />

      <Card className="!my-2 shadow-sm" classNames={{ body: "!p-4" }}>
        <OperlogToolbar />
        <OperlogTable />
      </Card>
    </Query>
  );
};

export default Operlog;
