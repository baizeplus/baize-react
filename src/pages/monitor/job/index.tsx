import { FC } from "react";
import { Card } from "antd";

import Query from "@/components/QueryTable/Query";
import TableSearchForm from "./components/TableSearchForm";
import Toolbar from "./components/Toolbar";
import Table from "./components/Table";

const Job: FC = () => {
  return (
    <Query>
      <TableSearchForm />

      <Card className="!my-2 shadow-sm" classNames={{ body: "!p-4" }}>
        <Toolbar />
        <Table />
      </Card>
    </Query>
  );
};

export default Job;
