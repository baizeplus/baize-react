import { FC } from "react";
import {Col, Row } from "antd";
import DeptTreeCard from "./components/DeptTreeCard";
import ContentCard from "./components/ContentCard";

const User:FC = () => {
  return (
    <div>
      <Row gutter={8}>
        <Col xs={24} sm={24} md={4}>
          <DeptTreeCard />
        </Col>
        <Col xs={24} sm={24} md={20}>
          <ContentCard />
        </Col>
      </Row>
    </div>
  )
};

export default User;