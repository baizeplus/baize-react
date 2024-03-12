import { FC, useEffect, useState } from "react";
import { Col, Row } from "antd";
import { getUserProfile } from "@/api/user";
import UserInfoCard from "./UserInfoCard";
import BaseInfoCard from "./BaseInfoCard";

const UserProfile: FC = () => {
  const [user, setUser] = useState<IUserProfile | null>(null);

  const getUser = async () => {
    const { data } = await getUserProfile();
    if (data) {
      setUser(data.user);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="h-full">
      <Row gutter={8} >
        <Col span={8} xs={24} sm={24} md={12} lg={8} className="mb-2">
          <UserInfoCard user={user} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={16}>
          <BaseInfoCard user={user} />
        </Col>
      </Row>
    </div>
  );
};

export default UserProfile;
