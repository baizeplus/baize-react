import { FC } from "react";
import { Card } from "antd";
import Query from "@/components/QueryTable/Query";

import TableSearchForm from "./components/TableSearchForm";
import MenuToolbar from "./components/MenuToolbar";
import MenuTable from "./components/MenuTable";

const Menu: FC = () => {
  return (
    <Query>
      <TableSearchForm />

      <Card className="!my-2 shadow-sm" classNames={{ body: "!p-4" }}>
        <MenuToolbar />
        <MenuTable />
      </Card>
    </Query>
  );
};

export default Menu;
