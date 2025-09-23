import { FC, useRef } from "react";
import { Button, Flex } from "antd";
import { DeleteOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons";

import Query from "@/components/QueryTable";
import { Auth } from "@/components";
import UpdateUserModal from "./TableActive/UpdateUserModal";
import DeleteUserModal, {
  IDeleteUserRefProps,
} from "./TableActive/DeleteUserModal";
import ExportButton from "./TableActive/ExportButton";
import ImportButton from "./TableActive/ImportModal";

const UserToolbar: FC = () => {
  const { queryFn, selectedRowId } = Query.useQueryTable();
  const deleteRef = useRef<IDeleteUserRefProps>(null);

  return (
    <>
      <Query.Toolbar>
        <Auth role="system:user:add">
          <UpdateUserModal onSuccess={queryFn}>
            <Button type="primary" icon={<PlusOutlined />}>
              新增
            </Button>
          </UpdateUserModal>
        </Auth>
        <Auth role="system:user:edit">
          <UpdateUserModal
            id={(selectedRowId[0] || "") as string}
            onSuccess={queryFn}
          >
            <Button
              disabled={!selectedRowId.length || selectedRowId.length > 1}
              type="primary"
              icon={<FormOutlined />}
            >
              修改
            </Button>
          </UpdateUserModal>
        </Auth>
        <Auth role="system:user:remove">
          <DeleteUserModal ref={deleteRef} onSuccess={queryFn}>
            <Button
              danger
              ghost
              disabled={!selectedRowId.length}
              icon={<DeleteOutlined />}
              onClick={() =>
                deleteRef.current?.deleteUser(selectedRowId.join(","))
              }
            >
              删除
            </Button>
          </DeleteUserModal>
        </Auth>
        <Auth role="system:user:import">
          <ImportButton />
        </Auth>
        <Auth role="system:user:export">
          <ExportButton />
        </Auth>
      </Query.Toolbar>
    </>
  );
};

export default UserToolbar;
