import { FC } from "react";
import { Card } from "antd";

import Query from "@/components/QueryTable/Query";
import TableSearchForm from "./components/TableSearchForm";
import LogToolbar from "./components/LogToolbar";
import LogTable from "./components/LogTable";

const JobLog: FC = () => {
  return (
    <Query>
      <TableSearchForm />

      <Card className="!my-2 shadow-sm" classNames={{ body: "!p-4" }}>
        <LogToolbar />
        <LogTable />
      </Card>
    </Query>
  );
};

export default JobLog;
