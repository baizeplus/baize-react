import { FC } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Query from "@/components/QueryTable";
import UpdateDrawer from "./TableActive/UpdateDrawer";
import { Auth } from "@/components";

type INoticeToolbarProps = {
  selectedRowKeys?: React.Key[];
};

const NoticeToolbar: FC<INoticeToolbarProps> = () => {
  return (
    <Query.Toolbar>
      <Auth role="system:notice:add">
        <UpdateDrawer>
          <Button type="primary" icon={<PlusOutlined />}>
            新增
          </Button>
        </UpdateDrawer>
      </Auth>
    </Query.Toolbar>
  );
};

export default NoticeToolbar;
