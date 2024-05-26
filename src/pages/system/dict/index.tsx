import { FC } from "react";
import { Card } from "antd";

import Query from "@/components/QueryTable";
import TableSearchForm from "./components/TableSearchForm";
import DictToolbar from "./components/DictToolbar";
import DicttTable from "./components/DictTable";

const Dict: FC = () => {
  return (
    <Query>
      <TableSearchForm />

      <Card className="!my-2 shadow-sm" classNames={{ body: "!p-4" }}>
        <DictToolbar />
        <DicttTable />
      </Card>
    </Query>
  );
};

export default Dict;
