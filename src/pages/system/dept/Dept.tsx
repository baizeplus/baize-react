import { FC } from "react";
import { Card } from "antd";

import Query from "@/components/QueryTable/Query";

import TableSearchForm from "./components/TableSearchForm";
import DeptToolbar from "./components/DeptToolbar";
import DeptTable from "./components/DeptTable";

const Dept: FC = () => {
  return (
    <Query>
      <TableSearchForm />

      <Card className="!my-2 shadow-sm" classNames={{ body: "!p-4" }}>
        <DeptToolbar />
        <DeptTable />
      </Card>
    </Query>
  );
};

export default Dept;
