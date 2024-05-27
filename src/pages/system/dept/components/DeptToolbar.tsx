import { FC } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Query from "@/components/QueryTable";
import UpdateDrawer from "./TableActive/UpdateDrawer";
import { Auth } from "@/components";
// import UpdateRoleDrawer from "./TableActive/UpdateRoleDrawer";

type IMenuToolbarProps = {
  selectedRowKeys?: React.Key[];
};

const DeptToolbar: FC<IMenuToolbarProps> = () => {
  // const { queryFn } = Query.useQueryTable();

  return (
    <Query.Toolbar>
      <Auth role="system:dept:add">
        <UpdateDrawer>
          <Button type="primary" icon={<PlusOutlined />}>
            新增
          </Button>
        </UpdateDrawer>
      </Auth>
      {/* <UpdateRoleDrawer id={selectedRowId[0]}> */}
      {/* <Button
          icon={<SwapOutlined />}
        >
          展开/折叠
        </Button> */}
      {/* </UpdateRoleDrawer> */}
    </Query.Toolbar>
  );
};

export default DeptToolbar;
