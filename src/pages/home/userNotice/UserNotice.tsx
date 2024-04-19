import { FC, useState } from "react";
import { Button, Card, Col, Flex, Radio, Row, Tabs, TabsProps } from "antd";
import { useParams } from "react-router-dom";
import NoticeTable from "./compoents/NoticeTable";
import { noticeReadAll } from "@/api/system/notice";
import ContextCard from "./compoents/ContextCard";
import userNoticeStore, { setStatus } from "@/store/userNotice";
import NoticeTabs from "./compoents/NoticeTabs";

const radioWithOptions = [
  { label: "全部", value: "" },
  { label: "未读", value: "1" },
  { label: "已读", value: "2" },
];

const UserNotice: FC = () => {
  const { id } = useParams<"id">();
  const { status } = userNoticeStore((state) => ({ status: state.status }));
  const [readLoading, setReadLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setReadLoading(true);
      await noticeReadAll();
    } finally {
      setReadLoading(false);
    }
  };

  return (
    <Row gutter={20} className="px-4">
      <Col span={10}>
        <Card>
          <NoticeTabs />
          <Flex justify="space-between">
            <Flex gap="small" wrap="wrap">
              <Button
                ghost
                type="primary"
                onClick={handleDelete}
                loading={readLoading}
              >
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
          <NoticeTable />
        </Card>
      </Col>
      <Col span={14}>
        <ContextCard />
      </Col>
    </Row>
  );
};

export default UserNotice;
