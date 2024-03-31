import { FC } from "react";
import { Flex, TableProps, Tag, Tooltip } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import Query from "@/components/QueryTable";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import { DeleteConfirm } from "@/components";
import UpdateDrawer from "./TableActive/UpdateDrawer";
import { delType, getTypeList } from "@/api/system/dict/type";
import { Link } from "react-router-dom";

const DictTable: FC = () => {
  const { queryFn } = Query.useQueryTable();

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
      render: (t) => (
        <Tag
          color={t === "0" ? "#e6f4ff" : "#fff1f0"}
          className={t === "0" ? "!text-primary" : "!text-[#ff4d4f]"}
        >
          {t === "0" ? "正常" : "停用"}
        </Tag>
      ),
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
            <UpdateDrawer id={r.dictId}>
              <Tooltip placement="top" title="修改">
                <FormOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
              </Tooltip>
            </UpdateDrawer>
            <DeleteConfirm
              id={r.dictId}
              text={`是否确认删除字典编号为"${r.dictId}"的数据项?`}
              delFn={delType}
              onSuccess={queryFn}
            >
              <Tooltip placement="top" title="删除">
                <DeleteOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
              </Tooltip>
            </DeleteConfirm>
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
        queryFn={getTypeList}
        columns={columns}
      />
    </>
  );
};

export default DictTable;
