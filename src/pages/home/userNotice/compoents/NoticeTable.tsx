import { FC, useCallback, useEffect, useState } from "react";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";

import useDict from "@/hooks/useDict";
import { getUserNoticeList } from "@/api/system/notice";
import { DictTag } from "@/components";
import userNoticeStore, { setNoticeData } from "@/store/userNotice";
import { MM_DD_HH_MM } from "@/utils/constant";

const NoticeTable: FC = () => {
  const [sys_notice_type] = useDict(["sys_notice_type"]);
  const { noticeType, status } = userNoticeStore((state) => ({
    noticeType: state.noticeType,
    status: state.status,
  }));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, size: 10 });
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: TableProps<INoticeItem>["columns"] = [
    {
      title: "",
      dataIndex: "title",
      key: "title",
      render: (t, r) => {
        return (
          <div>
            <h5 className="flex max-w-[240px]">
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
      title: "",
      dataIndex: "createTime",
      key: "createTime",
      width: 120,
      render: (t) => (
        <span className="text-sm text-gray-400">
          {dayjs(t).format(MM_DD_HH_MM)}
        </span>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

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
      setData(data?.rows);
      setTotal(data?.total);
    } finally {
      setLoading(false);
    }
  }, [noticeType, pagination, status]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleViewNotice = (data: INoticeItem) => {
    setNoticeData(data);
  };

  return (
    <Table
      rowKey={(e) => e.id}
      className="mt-4"
      showHeader={false}
      loading={loading}
      columns={columns}
      dataSource={data}
      rowSelection={rowSelection}
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
