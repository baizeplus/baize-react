import { FC, useState } from "react";
import { Card } from "antd";

import TableSearchForm from "./TableSearchForm";
import UserTable from "./UserTable";

const ContentCard: FC = () => {
  const [searchParams, setSearchParams] = useState<IUserSearchParams>({});

  return (
    <Card className="w-full shadow-sm" classNames={{ body: "!p-4" }}>
      <TableSearchForm onSearch={setSearchParams}/>
      <UserTable searchParams={searchParams} />
    </Card>
  );
};

export default ContentCard;
