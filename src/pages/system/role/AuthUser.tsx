import { FC } from "react";
import { Card } from "antd";
import TableSearchForm from "./components/AuthUser/TableSearchForm";
import Query from "@/components/QueryTable";
import AuthUserToolbar from "./components/AuthUser/Toolbar";
import AuthUserTable from "./components/AuthUser/Table";

const AuthUser: FC = () => {
  return (
    <Query>
      <TableSearchForm />

      <Card className="!my-2 shadow-sm" classNames={{ body: "!p-4" }}>
        <AuthUserToolbar />
        <AuthUserTable />
      </Card>
    </Query>
  );
};

export default AuthUser;
