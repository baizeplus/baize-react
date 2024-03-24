import { FC } from "react";
import { Card } from "antd";
import TableSearchForm from "./components/TableSearchForm";
import Query from "@/components/QueryTable";
import RoleTable from "./components/RoleTable";
import RoleToolbar from "./components/RoleToolbar";

const Role: FC = () => {
  return (
    <Query>
      <TableSearchForm />

      <Card className="!my-2 shadow-sm" classNames={{ body: "!p-4" }}>
        <RoleToolbar />
        <RoleTable />
      </Card>
    </Query>
  );
};

export default Role;
