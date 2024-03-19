import { FC, useState } from "react";
import { Col, Row } from "antd";
import DeptTreeCard from "./components/DeptTreeCard";
import ContentCard from "./components/ContentCard";

const User: FC = () => {
  const [deptId, setDeptId] = useState("");
  return (
    <div>
      <Row gutter={8}>
        <Col xs={24} sm={24} md={4}>
          <DeptTreeCard onSearch={setDeptId} />
        </Col>
        <Col xs={24} sm={24} md={20}>
          <ContentCard deptId={deptId} />
        </Col>
      </Row>
    </div>
  );
};

export default User;
