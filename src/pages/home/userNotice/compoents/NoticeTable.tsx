import { FC, useCallback, useEffect, useState } from "react";
import { Badge, Table, TableProps, Tooltip } from "antd";
import dayjs from "dayjs";

import useDict from "@/hooks/useDict";
import {
  getUserNoticeList,
  noticeDelete,
  noticeRead,
} from "@/api/system/notice";
import { DeleteConfirm, DictTag } from "@/components";
import userNoticeStore, { setNoticeData } from "@/store/userNotice";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import { DeleteOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

const NoticeTable: FC = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();
  const [sys_notice_type] = useDict(["sys_notice_type"]);
  const { noticeType, status } = userNoticeStore((state) => ({
    noticeType: state.noticeType,
    status: state.status,
    selectedRowKeys: state.selectedRowKeys,
  }));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, size: 10 });
  const [total, setTotal] = useState(0);

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: setSelectedRowKeys,
  // };

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const { page, size } = pagination;
      const { data } = await getUserNoticeList({
        type: noticeType,
        status,
        pageNum: page,
        pageSize: size,
      });
      if (id) {
        const item = data?.rows.find((item: INoticeItem) => item.id === id);
        if (item) {
          if (item.status === "1") {
            handleRead(item.id);
          }
          setNoticeData(item);
        }
      }
      const list = data?.rows?.map((item: INoticeItem) => {
        if (item.id === id && item.status === "1") {
          return { ...item, status: "2" };
        }
        return item;
      });
      setData(list);
      setTotal(data?.total);
    } finally {
      setLoading(false);
    }
  }, [id, noticeType, pagination, status]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    setNoticeData(undefined);
  }, []);

  const handleViewNotice = (data: INoticeItem) => {
    if (id) {
      navigate(`/index/userNotice`);
    }
    if (data.status === "1") {
      handleRead(data.id);
    }
    setNoticeData(data);
  };

  const handleRead = async (id: string) => {
    await noticeRead(id);
  };

  const handleDelSuccess = () => {
    getData();
    setNoticeData(undefined);
  };

  const columns: TableProps<INoticeItem>["columns"] = [
    {
      title: "消息标题",
      dataIndex: "title",
      key: "title",
      render: (t, r) => {
        return (
          <div>
            <h5 className="flex max-w-[240px]">
              {r.status === "1" && (
                <Badge status="error" className="!ml-[-12px] !mr-1" />
              )}
              <span className="truncate mr-2 text-sm">{t}</span>
              <DictTag options={sys_notice_type} value={r.type} />
            </h5>
            <div
              dangerouslySetInnerHTML={{ __html: r.txt }}
              className="w-[180px] truncate text-xs text-gray-400"
            />
          </div>
        );
      },
    },
    {
      title: "发送人",
      dataIndex: "createName",
      key: "createName",
      width: 120,
      render: (t) => (
        <div>
          <span>{t}</span>
        </div>
      ),
    },
    {
      title: "时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 160,
      render: (t) => (
        <p className="text-sm text-gray-400">
          {dayjs(t).format(YYYY_MM_DD_HH_mm)}
        </p>
      ),
    },
    {
      title: "操作",
      dataIndex: "id",
      width: 60,
      align: "center",
      render: (t, r) => (
        <DeleteConfirm
          id={t}
          text={`是否确认删除名称为"${r.title}"的通知?`}
          delFn={noticeDelete}
          onSuccess={handleDelSuccess}
        >
          <Tooltip placement="top" title="删除">
            <DeleteOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
          </Tooltip>
        </DeleteConfirm>
      ),
    },
  ];

  return (
    <Table
      rowKey={(e) => e.id}
      className="mt-4"
      loading={loading}
      columns={columns}
      dataSource={data}
      // rowSelection={rowSelection}
      scroll={{ x: 600 }}
      onRow={(record) => ({
        onClick: () => handleViewNotice(record),
      })}
      pagination={{
        pageSize: pagination.size,
        current: pagination.page,
        total: total,
        showTotal: (total) => `共 ${total} 条`,
        onChange: (page, pageSize) => setPagination({ page, size: pageSize }),
      }}
    />
  );
};

export default NoticeTable;
