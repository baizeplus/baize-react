import { FC } from "react";
import { Card } from "antd";

import Query from "@/components/QueryTable";
import TableSearchForm from "./TableSearchForm";
import UserTable from "./UserTable";
import UserToolbar from "./UserToolbar";

type IProps = {
  deptId: string;
};

const ContentCard: FC<IProps> = ({ deptId }) => {
  return (
    <Query>
      <TableSearchForm deptId={deptId} />
      <Card className="w-full shadow-sm" classNames={{ body: "!p-4" }}>
        <UserToolbar />
        <UserTable />
      </Card>
    </Query>
  );
};

export default ContentCard;
