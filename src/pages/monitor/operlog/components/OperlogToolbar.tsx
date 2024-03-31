import { FC } from "react";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import Query from "@/components/QueryTable";
import { DeleteConfirm, ExportButton } from "@/components";
import { delOperlog, exportOperlog } from "@/api/monitor/operlog";

type IToolbarProps = {
  selectedRowKeys?: React.Key[];
};

const Toolbar: FC<IToolbarProps> = () => {
  const { queryFn, selectedRowId } = Query.useQueryTable();

  return (
    <Query.Toolbar>
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
      <Button
        danger
        ghost
        disabled={!selectedRowId.length}
        icon={<DeleteOutlined />}
      >
        清空
      </Button>
      <ExportButton fileNamePrefix="operlog" exportFn={exportOperlog} />
    </Query.Toolbar>
  );
};

export default Toolbar;
