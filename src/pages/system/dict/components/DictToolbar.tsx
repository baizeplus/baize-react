import { FC } from "react";
import { Button } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import Query from "@/components/QueryTable";
import UpdateDrawer from "./TableActive/UpdateDrawer";
import { Auth, DeleteConfirm, ExportButton } from "@/components";
import RefreshButton from "./TableActive/RefreshButton";
import { delDictType, exportDictType } from "@/api/system/dict/type";

type IToolbarProps = {
  selectedRowKeys?: React.Key[];
};

const DictToolbar: FC<IToolbarProps> = () => {
  const { queryFn, selectedRowId } = Query.useQueryTable();

  return (
    <Query.Toolbar>
      <Auth role="system:dict:add">
        <UpdateDrawer>
          <Button type="primary" icon={<PlusOutlined />}>
            新增
          </Button>
        </UpdateDrawer>
      </Auth>
      <Auth role="system:dict:edit">
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
      <Auth role="system:dict:remove">
        <DeleteConfirm
          id={selectedRowId.join(",")}
          text={`是否确认删除字典编号为"${selectedRowId.join(",")}"的数据项?`}
          delFn={delDictType}
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
        <ExportButton fileNamePrefix="dict" exportFn={exportDictType} />
      </Auth>
      <Auth role="system:dict:remove">
        <RefreshButton />
      </Auth>
    </Query.Toolbar>
  );
};

export default DictToolbar;
