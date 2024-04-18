import { FC, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Flex,
  Radio,
  Row,
  Table,
  TableProps,
  Tabs,
  TabsProps,
} from "antd";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { DictTag } from "@/components";
import useDict from "@/hooks/useDict";
import { MM_DD_HH_MM } from "@/utils/constant";
import { getUserNoticeList } from "@/api/system/notice";

const radioWithOptions = [
  { label: "全部", value: "" },
  { label: "未读", value: "1" },
  { label: "已读", value: "2" },
];

const UserNotice: FC = () => {
  const { id } = useParams<"id">();
  const [sys_notice_type] = useDict(["sys_notice_type"]);
  const [activeKey, setActiveKey] = useState("1");
  const [status, setStatus] = useState("1");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "全部",
    },
    {
      key: "2",
      label: "通知",
    },
    {
      key: "3",
      label: "公告",
    },
  ];

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

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await getUserNoticeList({ page: 1, size: 10 });
      setData(data.rows);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Row gutter={20} className="px-4">
      <Col span={8}>
        <Card>
          <Tabs activeKey={activeKey} onChange={setActiveKey} items={items} />
          <Flex justify="space-between">
            <Flex gap="small" wrap="wrap">
              <Button ghost type="primary">
                全部已读
              </Button>
              <Button danger>删除</Button>
            </Flex>
            <Flex gap="small" wrap="wrap">
              <Radio.Group
                options={radioWithOptions}
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                optionType="button"
                buttonStyle="solid"
              />
            </Flex>
          </Flex>
          <Table
            className="mt-4"
            showHeader={false}
            loading={loading}
            columns={columns}
            dataSource={data}
          />
        </Card>
      </Col>
      <Col span={16}>
        <Card></Card>
      </Col>
    </Row>
  );
};

export default UserNotice;
