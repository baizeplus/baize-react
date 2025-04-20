import { FC } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Query from "@/components/QueryTable";
import UpdateMenuDrawer from "./TableActive/UpdateDrawer";
import { Auth } from "@/components";
// import UpdateRoleDrawer from "./TableActive/UpdateRoleDrawer";

type IPermissionToolbarProps = {
  selectedRowKeys?: React.Key[];
};

const PermissionToolbar: FC<IPermissionToolbarProps> = () => {
  // const { queryFn } = Query.useQueryTable();

  return (
    <Query.Toolbar>
      <Auth role="system:permission:add">
        <UpdateMenuDrawer>
          <Button type="primary" icon={<PlusOutlined />}>
            新增
          </Button>
        </UpdateMenuDrawer>
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

export default PermissionToolbar;
