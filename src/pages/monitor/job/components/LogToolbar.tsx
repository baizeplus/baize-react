import { FC } from "react";
import { Button } from "antd";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";

import Query from "@/components/QueryTable";
import { DeleteConfirm, ExportButton } from "@/components";
import { useNavigate } from "react-router-dom";
import { cleanJobLog, delJobLog, exportJobLog } from "@/api/monitor/jobLog";
// import UpdateRoleDrawer from "./TableActive/UpdateRoleDrawer";

type IToolbarProps = {
  selectedRowKeys?: React.Key[];
};

const LogToolbar: FC<IToolbarProps> = () => {
  const navigate = useNavigate();
  const { selectedRowId, queryFn } = Query.useQueryTable();

  return (
    <Query.Toolbar>
      <DeleteConfirm
        id={selectedRowId.join(",")}
        text={`是否确认删除调度日志编号为"${selectedRowId.join(",")}"的数据项?`}
        delFn={delJobLog}
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
        text={`是否确认清空所有调度日志数据项?`}
        delFn={cleanJobLog}
        onSuccess={() => queryFn?.("del")}
      >
        <Button
          danger
          ghost
          disabled={!selectedRowId.length}
          icon={<DeleteOutlined />}
        >
          清空
        </Button>
      </DeleteConfirm>
      <ExportButton fileNamePrefix="post" exportFn={exportJobLog} />
      <Button onClick={() => navigate(-1)} icon={<CloseOutlined />}>
        关闭
      </Button>
    </Query.Toolbar>
  );
};

export default LogToolbar;
