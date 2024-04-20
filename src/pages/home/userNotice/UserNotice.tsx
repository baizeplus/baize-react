import { FC } from "react";
import { Card, Col, Row } from "antd";
import NoticeTable from "./compoents/NoticeTable";
import ContextCard from "./compoents/ContextCard";
import NoticeTabs from "./compoents/NoticeTabs";
import Toolbar from "./compoents/Toolbar";

const UserNotice: FC = () => {
  return (
    <Row gutter={20} className="px-4">
      <Col span={10}>
        <Card>
          <NoticeTabs />
          <Toolbar />
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
