import { FC, useEffect } from "react";
import { Button } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

import Query from "@/components/QueryTable";
import { Auth, DeleteConfirm } from "@/components";
import { authUserCancelAll } from "@/api/system/role";
import AddUserDrawer from "./UserRoleDrawer/AddUserDrawer";

type IAuthUserToolbarProps = {
  selectedRowKeys?: React.Key[];
};

const AuthUserToolbar: FC<IAuthUserToolbarProps> = () => {
  const navigate = useNavigate();
  const { roleId } = useParams();
  const { selectedRowId, queryFn } = Query.useQueryTable();

  useEffect(() => {
    console.log(selectedRowId);
  }, [selectedRowId]);

  return (
    <Query.Toolbar>
      <Auth role="system:role:add">
        <AddUserDrawer>
          <Button type="primary" icon={<PlusOutlined />}>
            添加用户
          </Button>
        </AddUserDrawer>
      </Auth>

      <Auth role="system:role:remove">
        <DeleteConfirm
          text="是否取消选中用户授权数据项?"
          delFn={() =>
            authUserCancelAll({
              roleId: roleId,
              userIds: selectedRowId.join(","),
            })
          }
          okText="确认"
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
