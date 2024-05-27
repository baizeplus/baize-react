import { FC } from "react";
import { Flex, TableProps, Tooltip } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import Query from "@/components/QueryTable";
// import UpdateRoleDrawer from "./TableActive/UpdateRoleDrawer";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import { Auth, DeleteConfirm } from "@/components";
import { delPost, getPostList } from "@/api/system/post";
import UpdateDrawer from "./TableActive/UpdateDrawer";
import DictTag from "@/components/DictTag";
import useDict from "@/hooks/useDict";

const PostTable: FC = () => {
  const { queryFn } = Query.useQueryTable();
  const [sys_normal_disable] = useDict(["sys_normal_disable"]);

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
      render: (t) => <DictTag options={sys_normal_disable} value={t} />,
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
            <Auth role="system:post:edit">
              <UpdateDrawer id={r.postId}>
                <Tooltip placement="top" title="修改">
                  <FormOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
                </Tooltip>
              </UpdateDrawer>
            </Auth>
            <Auth role="system:post:remove">
              <DeleteConfirm
                id={r.postId}
                text={`是否确认删除岗位编号为"${r.postId}"的数据项?`}
                delFn={delPost}
                onSuccess={queryFn}
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
        rowKey={(e) => e.postId}
        queryFn={getPostList}
        columns={columns}
      />
    </>
  );
};

export default PostTable;
