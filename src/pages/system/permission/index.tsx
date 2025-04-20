import { FC } from "react";
import { Card } from "antd";
import Query from "@/components/QueryTable/Query";

import TableSearchForm from "./components/TableSearchForm";
import PermissionToolbar from "./components/Toolbar";
import PermissionTable from "./components/Table";

const Permission: FC = () => {
  return (
    <Query>
      <TableSearchForm />

      <Card className="!my-2 shadow-sm" classNames={{ body: "!p-4" }}>
        <PermissionToolbar />
        <PermissionTable />
      </Card>
    </Query>
  );
};

export default Permission;
