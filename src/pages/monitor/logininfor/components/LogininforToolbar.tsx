import { FC } from "react";
import { Button } from "antd";
import { DeleteOutlined, UnlockOutlined } from "@ant-design/icons";

import Query from "@/components/QueryTable";
import { DeleteConfirm, ExportButton } from "@/components";
import {
  cleanLogininfor,
  delLogininfor,
  exportLogininfor,
  unlockLogininfor,
} from "@/api/monitor/logininfor";

type IToolbarProps = {
  selectedRowKeys?: React.Key[];
};

const LogininforToolbar: FC<IToolbarProps> = () => {
  const { queryFn, selectedRowId, selectedRows } = Query.useQueryTable();

  return (
    <Query.Toolbar>
      <DeleteConfirm
        id={selectedRowId.join(",")}
        text={`是否确认删除访问编号为"${selectedRowId.join(",")}"的数据项?`}
        delFn={delLogininfor}
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
      <DeleteConfirm
        id={selectedRowId.join(",")}
        text={`是否确认清空所有登录日志数据项?`}
        delFn={cleanLogininfor}
        onSuccess={() => queryFn?.("del")}
      >
        <Button danger ghost icon={<DeleteOutlined />}>
          清空
        </Button>
      </DeleteConfirm>
      <DeleteConfirm
        id={selectedRowId.join(",")}
        text={`是否确认解锁用户"${(selectedRows[0] as ILogininforItem)?.userName}"数据项?`}
        successText="解锁成功"
        delFn={unlockLogininfor}
        onSuccess={() => queryFn?.()}
      >
        <Button
          type="primary"
          ghost
          disabled={!selectedRowId.length || selectedRowId.length > 1}
          icon={<UnlockOutlined />}
        >
          解锁
        </Button>
      </DeleteConfirm>
      <ExportButton fileNamePrefix="logininfor" exportFn={exportLogininfor} />
    </Query.Toolbar>
  );
};

export default LogininforToolbar;
