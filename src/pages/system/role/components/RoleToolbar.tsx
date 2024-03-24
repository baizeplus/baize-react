import { FC } from "react";
import { Button } from "antd";
import { DeleteOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons";

import Query from "@/components/QueryTable";
import UpdateRoleDrawer from "./TableActive/UpdateRoleDrawer";
import { DeleteConfirm, ExportButton } from "@/components";
import { delRole, exportRole } from "@/api/system/role";

type IRoleToolbarProps = {
  selectedRowKeys?: React.Key[];
};

const RoleToolbar: FC<IRoleToolbarProps> = () => {
  const { selectedRowId, queryFn } = Query.useQueryTable();

  return (
    <Query.Toolbar>
      <UpdateRoleDrawer>
        <Button type="primary" icon={<PlusOutlined />}>
          新增
        </Button>
      </UpdateRoleDrawer>
      <UpdateRoleDrawer id={selectedRowId[0]}>
        <Button
          disabled={!selectedRowId.length || selectedRowId.length > 1}
          type="primary"
          icon={<FormOutlined />}
        >
          修改
        </Button>
      </UpdateRoleDrawer>
      <DeleteConfirm
        id={selectedRowId.join(",")}
        tipTag="角色"
        delFn={delRole}
        onSuccess={() => queryFn?.("del")}
      >
        <Button
          danger
          ghost
          disabled={!selectedRowId.length}
          icon={<DeleteOutlined />}
        >
          删除
        </Button>
      </DeleteConfirm>
      <ExportButton fileNamePrefix="role" exportFn={exportRole} />
    </Query.Toolbar>
  );
};

export default RoleToolbar;
