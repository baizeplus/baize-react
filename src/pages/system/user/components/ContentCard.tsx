import { FC, useState } from "react";
import { Card } from "antd";

import TableSearchForm from "./TableSearchForm";
import UserTable from "./UserTable";

type IProps = {
  deptId: string;
};

const ContentCard: FC<IProps> = ({ deptId }) => {
  const [searchParams, setSearchParams] = useState<IUserSearchParams>({});
  const [hideSearch, setHideSearch] = useState(false);
  return (
    <Card className="w-full shadow-sm" classNames={{ body: "!p-4" }}>
      {!hideSearch && <TableSearchForm onSearch={setSearchParams} />}
      <UserTable
        searchParams={searchParams}
        deptId={deptId}
        onHideSearch={setHideSearch}
      />
    </Card>
  );
};

export default ContentCard;
