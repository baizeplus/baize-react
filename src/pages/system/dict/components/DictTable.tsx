import { FC } from "react";
import { Flex, TableProps, Tooltip } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import Query from "@/components/QueryTable";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import { Auth, DeleteConfirm, DictTag } from "@/components";
import UpdateDrawer from "./TableActive/UpdateDrawer";
import { delDictType, getDictTypeList } from "@/api/system/dict/type";
import { Link } from "react-router-dom";
import useDict from "@/hooks/useDict";

const DictTable: FC = () => {
  const { queryFn } = Query.useQueryTable();
  const [sys_normal_disable] = useDict(["sys_normal_disable"]);

  const columns: TableProps<IDictItem>["columns"] = [
    {
      title: "字典编号",
      dataIndex: "dictId",
      key: "dictId",
      align: "center",
    },
    {
      title: "字典名称",
      dataIndex: "dictName",
      key: "dictName",
      align: "center",
      ellipsis: true,
    },
    {
      title: "字典类型",
      dataIndex: "dictType",
      key: "dictType",
      align: "center",
      ellipsis: true,
      render: (t, r) => (
        <Link to={`/index/system/dict-type/${r.dictType}`}>{t}</Link>
      ),
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      align: "center",
      ellipsis: true,
      render: (t) => <DictTag options={sys_normal_disable} value={t} />,
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "postSort",
      align: "center",
      ellipsis: true,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      align: "center",
      width: 160,
      ellipsis: true,
      render: (t: string) => dayjs(t).format(YYYY_MM_DD_HH_mm),
    },
    {
      title: "操作",
      dataIndex: "active",
      key: "active",
      align: "center",
      width: 70,
      render: (_, r) => {
        return (
          <Flex gap={8}>
            <Auth role="system:dict:edit">
              <UpdateDrawer id={r.dictId}>
                <Tooltip placement="top" title="修改">
                  <FormOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
                </Tooltip>
              </UpdateDrawer>
            </Auth>
            <Auth role="system:dict:remove">
              <DeleteConfirm
                id={r.dictId}
                text={`是否确认删除字典编号为"${r.dictId}"的数据项?`}
                delFn={delDictType}
                onSuccess={() => queryFn?.("del")}
              >
                <Tooltip placement="top" title="删除">
                  <DeleteOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
                </Tooltip>
              </DeleteConfirm>
            </Auth>
          </Flex>
        );
      },
    },
  ];

  return (
    <>
      <Query.Table
        isRowSelection
        isPagination
        rowKey={(e) => e.dictId}
        queryFn={getDictTypeList}
        columns={columns}
      />
    </>
  );
};

export default DictTable;
