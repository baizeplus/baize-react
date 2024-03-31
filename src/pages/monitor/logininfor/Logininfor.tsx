import { FC } from "react";
import { Card } from "antd";

import Query from "@/components/QueryTable";
import TableSearchForm from "./components/TableSearchForm";
import LogininforToolbar from "./components/LogininforToolbar";
import LogininforTable from "./components/LogininforTable";

const Logininfor: FC = () => {
  return (
    <Query>
      <TableSearchForm />

      <Card className="!my-2 shadow-sm" classNames={{ body: "!p-4" }}>
        <LogininforToolbar />
        <LogininforTable />
      </Card>
    </Query>
  );
};

export default Logininfor;
