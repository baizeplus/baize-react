import { FC } from "react";
import { Card } from "antd";

import Query from "@/components/QueryTable";
import TableSearchForm from "./components/TableSearchForm";
import OnLineTable from "./components/Table";

const OnLine: FC = () => {
  return (
    <Query>
      <TableSearchForm />
      <Card className="!my-2 shadow-sm" classNames={{ body: "!p-4" }}>
        <OnLineTable />
      </Card>
    </Query>
  );
};

export default OnLine;
