import { FC } from "react";
import { Flex, TableProps, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import Query from "@/components/QueryTable";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import { DeleteConfirm } from "@/components";
import { delNotice, getNoticeList } from "@/api/system/notice";
import DictTag from "@/components/DictTag";
import useDict from "@/hooks/useDict";

const NoticeTable: FC = () => {
  const { queryFn } = Query.useQueryTable();
  const [sys_notice_type] = useDict(["sys_notice_type"]);

  const columns: TableProps<INoticeItem>["columns"] = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 80,
      render: (_, _r, index) => {
        return index + 1;
      },
    },
    {
      title: "公告标题",
      dataIndex: "title",
      key: "noticeTitle",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "公告类型",
      dataIndex: "type",
      key: "type",
      align: "center",
      ellipsis: true,
      render: (t) => <DictTag options={sys_notice_type} value={t} />,
    },
    {
      title: "创建者",
      dataIndex: "createName",
      key: "createName",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
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
            <DeleteConfirm
              id={r.id}
              text={`是否确认删除通知编号为"${r.id}"的数据项?`}
              delFn={delNotice}
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
        rowKey={(e) => e.id}
        queryFn={getNoticeList}
        columns={columns}
      />
    </>
  );
};

export default NoticeTable;
