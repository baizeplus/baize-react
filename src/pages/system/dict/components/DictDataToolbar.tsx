import { FC } from "react";
import { Button } from "antd";
import { DeleteOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import Query from "@/components/QueryTable";
import { Auth, DeleteConfirm, ExportButton } from "@/components";
import UpdateDataDrawer from "./TableActive/UpdateDataDrawer";
import { delDictData, exportDictData } from "@/api/system/dict/data";

type IToolbarProps = {
  selectedRowKeys?: React.Key[];
};

const DictTypeToolbar: FC<IToolbarProps> = () => {
  const { queryFn, selectedRowId } = Query.useQueryTable();
  const navigate = useNavigate();

  return (
    <Query.Toolbar>
      <Auth role="system:dict:add">
        <UpdateDataDrawer>
          <Button type="primary" icon={<PlusOutlined />}>
            新增
          </Button>
        </UpdateDataDrawer>
      </Auth>
      <Auth role="system:dict:edit">
        <UpdateDataDrawer id={selectedRowId[0]}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            disabled={!selectedRowId.length || selectedRowId.length > 1}
          >
            修改
          </Button>
        </UpdateDataDrawer>
      </Auth>
      <Auth role="system:dict:remove">
        <DeleteConfirm
          id={selectedRowId.join(",")}
          text={`是否确认删除字典编码为"${selectedRowId.join(",")}"的数据项?`}
          delFn={delDictData}
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
      <Auth role="system:dict:export">
        <ExportButton fileNamePrefix="dict_data" exportFn={exportDictData} />
      </Auth>
      <Button onClick={() => navigate(-1)} icon={<CloseOutlined />}>
        关闭
      </Button>
    </Query.Toolbar>
  );
};

export default DictTypeToolbar;
