import { FC } from "react";
import { Button } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import Query from "@/components/QueryTable";
import { Auth, DeleteConfirm } from "@/components";
import { delRole } from "@/api/system/role";

type IAuthUserToolbarProps = {
  selectedRowKeys?: React.Key[];
};

const AuthUserToolbar: FC<IAuthUserToolbarProps> = () => {
  const navigate = useNavigate();
  const { selectedRowId, queryFn } = Query.useQueryTable();

  return (
    <Query.Toolbar>
      <Auth role="system:role:add">
        {/* <UpdateRoleDrawer> */}
        <Button type="primary" icon={<PlusOutlined />}>
          添加用户
        </Button>
        {/* </UpdateRoleDrawer> */}
      </Auth>

      <Auth role="system:role:remove">
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
            icon={<CloseOutlined />}
          >
            批量取消授权
          </Button>
        </DeleteConfirm>
      </Auth>
      <Button onClick={() => navigate(-1)} icon={<CloseOutlined />}>
        关闭
      </Button>
    </Query.Toolbar>
  );
};

export default AuthUserToolbar;
