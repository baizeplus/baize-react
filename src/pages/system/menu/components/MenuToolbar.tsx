import { FC } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Query from "@/components/QueryTable";
import UpdateMenuDrawer from "./TableActive/UpdateMenuDrawer";
// import UpdateRoleDrawer from "./TableActive/UpdateRoleDrawer";

type IMenuToolbarProps = {
  selectedRowKeys?: React.Key[];
};

const MenuToolbar: FC<IMenuToolbarProps> = () => {
  // const { queryFn } = Query.useQueryTable();

  return (
    <Query.Toolbar>
      <UpdateMenuDrawer>
        <Button type="primary" icon={<PlusOutlined />}>
          新增
        </Button>
      </UpdateMenuDrawer>
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

export default MenuToolbar;
