import { FC } from "react";
import { Button } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import Query from "@/components/QueryTable";
import UpdateDrawer from "./TableActive/UpdateDrawer";
import { Auth, DeleteConfirm, ExportButton } from "@/components";
import { delPost, exportPost } from "@/api/system/post";

type IpostToolbarProps = {
  selectedRowKeys?: React.Key[];
};

const PostToolbar: FC<IpostToolbarProps> = () => {
  const { queryFn, selectedRowId } = Query.useQueryTable();

  return (
    <Query.Toolbar>
      <Auth role="system:post:add">
        <UpdateDrawer>
          <Button type="primary" icon={<PlusOutlined />}>
            新增
          </Button>
        </UpdateDrawer>
      </Auth>
      <Auth role="system:post:edit">
        <UpdateDrawer id={selectedRowId[0]}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            disabled={!selectedRowId.length || selectedRowId.length > 1}
          >
            修改
          </Button>
        </UpdateDrawer>
      </Auth>
      <Auth role="system:post:remove">
        <DeleteConfirm
          id={selectedRowId.join(",")}
          text={`是否确认删除岗位编号为"${selectedRowId.join(",")}"的数据项?`}
          delFn={delPost}
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
      </Auth>
      <Auth role="system:post:export">
        <ExportButton fileNamePrefix="post" exportFn={exportPost} />
      </Auth>
    </Query.Toolbar>
  );
};

export default PostToolbar;
