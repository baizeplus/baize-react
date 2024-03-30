import { FC, useRef } from "react";
import { Flex, TableProps, Tag, Tooltip } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import Query, { IQueryTableRefProps } from "@/components/QueryTable";
// import UpdateRoleDrawer from "./TableActive/UpdateRoleDrawer";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import { DeleteConfirm } from "@/components";
import { delPost, getPostList } from "@/api/system/post";
import UpdateDrawer from "./TableActive/UpdateDrawer";

const PostTable: FC = () => {
  const tableRef = useRef<IQueryTableRefProps>(null);

  const columns: TableProps<IPostItem>["columns"] = [
    {
      title: "岗位ID",
      dataIndex: "postId",
      key: "postId",
      align: "center",
      width: 160,
    },
    {
      title: "岗位编码",
      dataIndex: "postCode",
      key: "postCode",
      align: "center",
      ellipsis: true,
    },
    {
      title: "岗位名称",
      dataIndex: "postName",
      key: "postName",
      align: "center",
      ellipsis: true,
    },
    {
      title: "岗位排序",
      dataIndex: "postSort",
      key: "postSort",
      align: "center",
      ellipsis: true,
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
      width: 100,
      render: (_, r) => {
        return (
          <Flex gap={8}>
            <UpdateDrawer id={r.postId}>
              <Tooltip placement="top" title="修改">
                <FormOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
              </Tooltip>
            </UpdateDrawer>
            <DeleteConfirm
              id={r.postId}
              text={`是否确认删除岗位编号为"${r.postId}"的数据项?`}
              delFn={delPost}
              onSuccess={tableRef.current?.reload}
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
        ref={tableRef}
        isRowSelection
        rowKey={(e) => e.postId}
        queryFn={getPostList}
        columns={columns}
      />
    </>
  );
};

export default PostTable;
