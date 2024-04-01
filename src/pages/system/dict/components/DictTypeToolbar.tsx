import { FC } from "react";
import { Button } from "antd";
import { DeleteOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import Query from "@/components/QueryTable";
import { DeleteConfirm, ExportButton } from "@/components";
import { delPost, exportPost } from "@/api/system/post";
import UpdateDataDrawer from "./TableActive/UpdateDataDrawer";

type IToolbarProps = {
  selectedRowKeys?: React.Key[];
};

const DictTypeToolbar: FC<IToolbarProps> = () => {
  const { queryFn, selectedRowId } = Query.useQueryTable();
  const navigate = useNavigate();

  return (
    <Query.Toolbar>
      <UpdateDataDrawer>
        <Button type="primary" icon={<PlusOutlined />}>
          新增
        </Button>
      </UpdateDataDrawer>
      <UpdateDataDrawer id={selectedRowId[0]}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          disabled={!selectedRowId.length || selectedRowId.length > 1}
        >
          修改
        </Button>
      </UpdateDataDrawer>
      <DeleteConfirm
        id={selectedRowId.join(",")}
        text={`是否确认删除字典编码为"${selectedRowId.join(",")}"的数据项?`}
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
      <ExportButton fileNamePrefix="post" exportFn={exportPost} />
      <Button onClick={() => navigate(-1)} icon={<CloseOutlined />}>
        关闭
      </Button>
    </Query.Toolbar>
  );
};

export default DictTypeToolbar;
