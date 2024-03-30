import { FC } from "react";
import { Button } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import Query from "@/components/QueryTable";
import UpdateDrawer from "./TableActive/UpdateDrawer";
import { DeleteConfirm, ExportButton } from "@/components";
import { delConfig, exportConfig } from "@/api/system/config";
import RefreshButton from "./TableActive/RefreshButton";
// import UpdateRoleDrawer from "./TableActive/UpdateRoleDrawer";

type INoticeToolbarProps = {
  selectedRowKeys?: React.Key[];
};

const NoticeToolbar: FC<INoticeToolbarProps> = () => {
  const { selectedRowId, queryFn } = Query.useQueryTable();

  return (
    <Query.Toolbar>
      <UpdateDrawer>
        <Button type="primary" icon={<PlusOutlined />}>
          新增
        </Button>
      </UpdateDrawer>
      <UpdateDrawer id={selectedRowId[0]}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          disabled={!selectedRowId.length || selectedRowId.length > 1}
        >
          修改
        </Button>
      </UpdateDrawer>
      <DeleteConfirm
        id={selectedRowId.join(",")}
        text={`是否确认删除参数编号为"${selectedRowId.join(",")}"的数据项?`}
        delFn={delConfig}
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
    </Query.Toolbar>
  );
};

export default NoticeToolbar;
