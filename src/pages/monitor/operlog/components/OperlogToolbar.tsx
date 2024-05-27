import { FC } from "react";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import Query from "@/components/QueryTable";
import { Auth, DeleteConfirm, ExportButton } from "@/components";
import { delOperlog, exportOperlog } from "@/api/monitor/operlog";

type IToolbarProps = {
  selectedRowKeys?: React.Key[];
};

const Toolbar: FC<IToolbarProps> = () => {
  const { queryFn, selectedRowId } = Query.useQueryTable();

  return (
    <Query.Toolbar>
      <Auth role="monitor:operlog:remove">
        <DeleteConfirm
          id={selectedRowId.join(",")}
          text={`是否确认删除操作编号为"${selectedRowId.join(",")}"的数据项?`}
          delFn={delOperlog}
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
      <Auth role="monitor:operlog:remove">
        <Button
          danger
          ghost
          disabled={!selectedRowId.length}
          icon={<DeleteOutlined />}
        >
          清空
        </Button>
      </Auth>
      <Auth role="monitor:operlog:export">
        <ExportButton fileNamePrefix="operlog" exportFn={exportOperlog} />
      </Auth>
    </Query.Toolbar>
  );
};

export default Toolbar;
