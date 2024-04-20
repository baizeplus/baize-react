import { useEffect, useState } from "react";
import { Badge, Button, Popover, Table, TableProps, Tooltip } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { getNewMessage, getUserNoticeList } from "@/api/system/notice";
import userNoticeStore, { setDot } from "@/store/userNotice";
import { MM_DD_HH_MM } from "@/utils/constant";
import { DictTag } from "@/components";
import useDict from "@/hooks/useDict";
import { setNoticeData } from "@/store/userNotice";
import { getToken } from "@/utils/auth";
const sseUrl = import.meta.env.VITE_APP_BASE_API + "/system/sse/" + getToken();

const NoticeBtn = () => {
  const navigate = useNavigate();
  const { dot } = userNoticeStore((state) => ({
    dot: state.dot,
    status: state.status,
  }));
  const [sys_notice_type] = useDict(["sys_notice_type"]);
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns: TableProps<INoticeItem>["columns"] = [
    {
      title: "",
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

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await getUserNoticeList({ page: 1, size: 5 });
      setData(data.rows);
    } finally {
      setLoading(false);
    }
  };

  const getNewMessageNum = async () => {
    const { data } = await getNewMessage();
    setDot(data !== 0);
  };

  useEffect(() => {
    const eventSource = new EventSource(sseUrl);

    eventSource.addEventListener("notice", () => {
      console.log("111");
      getNewMessage();
    });

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  useEffect(() => {
    if (clicked) {
      getData();
    }
  }, [clicked]);

  useEffect(() => {
    getNewMessageNum();
  }, []);

  const handleNavigate = (data?: INoticeItem) => {
    setClicked(false);
    if (data?.id) {
      setNoticeData(data);
      navigate(`/index/userNotice/${data.id}`);
    } else {
      navigate(`/index/userNotice`);
    }
  };

  return (
    <Tooltip placement="top" title="消息">
      <Popover
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
        overlayClassName="w-[350px]"
        content={
          <>
            <Table
              size="small"
              rowKey={(e) => e.id}
              loading={loading}
              showHeader={false}
              columns={columns}
              dataSource={data}
              pagination={false}
              onRow={(record) => ({
                onClick: () => handleNavigate(record),
              })}
            />
            <Button className="w-full mt-2" onClick={() => handleNavigate()}>
              全部
            </Button>
          </>
        }
        trigger="click"
        open={clicked}
        onOpenChange={() => setClicked(!clicked)}
      >
        <Badge dot={dot} offset={[-4, 4]} className="!mr-3">
          <BellOutlined className="text-[20px] cursor-pointer" />
        </Badge>
      </Popover>
    </Tooltip>
  );
};

export default NoticeBtn;
