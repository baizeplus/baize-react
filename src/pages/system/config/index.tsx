import { FC } from "react";
import { Card } from "antd";

import Query from "@/components/QueryTable/Query";
import TableSearchForm from "./components/TableSearchForm";
import ConfigToolbar from "./components/ConfigToolbar";
import ConfigTable from "./components/ConfigTable";

const Post: FC = () => {
  return (
    <Query>
      <TableSearchForm />

      <Card className="!my-2 shadow-sm" classNames={{ body: "!p-4" }}>
        <ConfigToolbar />
        <ConfigTable />
      </Card>
    </Query>
  );
};

export default Post;
