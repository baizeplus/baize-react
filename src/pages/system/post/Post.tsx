import { FC } from "react";
import { Card } from "antd";

import Query from "@/components/QueryTable/Query";
import TableSearchForm from "./components/TableSearchForm";
import PostToolbar from "./components/PostToolbar";
import PostTable from "./components/PostTable";

const Post: FC = () => {
  return (
    <Query>
      <TableSearchForm />

      <Card className="!my-2 shadow-sm" classNames={{ body: "!p-4" }}>
        <PostToolbar />
        <PostTable />
      </Card>
    </Query>
  );
};

export default Post;
