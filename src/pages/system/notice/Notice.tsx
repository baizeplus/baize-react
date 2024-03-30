import { FC } from "react";
import { Card } from "antd";

import Query from "@/components/QueryTable/Query";
import TableSearchForm from "./components/TableSearchForm";
import NoticeToolbar from "./components/NoticeToolbar";
import NoticeTable from "./components/NoticeTable";

const Notice: FC = () => {
  return (
    <Query>
      <TableSearchForm />

      <Card className="!my-2 shadow-sm" classNames={{ body: "!p-4" }}>
        <NoticeToolbar />
        <NoticeTable />
      </Card>
    </Query>
  );
};

export default Notice;
