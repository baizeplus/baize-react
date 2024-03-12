import { FC } from "react";
import { Avatar, Card, Flex, Typography } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined, DatabaseOutlined, ApartmentOutlined, TeamOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";

type IUserInfoCardProps = {
  user: IUserProfile | null;
};

const UserInfoCard: FC<IUserInfoCardProps> = ({ user}) => {
  return (
    <Card title="个人信息">
      <Flex justify="center">
        <Avatar src={user?.avatar} size={120} icon={<UserOutlined />} />
      </Flex>
      <ol className="mt-6 border-t">
        <li className="flex justify-between border-b py-2 px-2">
          <div>
            <UserOutlined />
            <span className="ml-2">用户名称</span>
          </div>
          <span>{user?.userName}</span>
        </li>
        <li className="flex justify-between border-b py-2 px-2">
          <div>
            <PhoneOutlined />
            <span className="ml-2">手机号码</span>
          </div>
          <Typography.Text copyable>{user?.phonenumber}</Typography.Text>
        </li>
        <li className="flex justify-between border-b py-2 px-2">
          <div>
            <MailOutlined />
            <span className="ml-2">用户邮箱</span>
          </div>
          <Typography.Text copyable>{user?.email}</Typography.Text>
        </li>
        <li className="flex justify-between border-b py-2 px-2">
          <div>
            <ApartmentOutlined />
            <span className="ml-2">所属部门</span>
          </div>
          <span>{user?.deptName}</span>
        </li>
        <li className="flex justify-between border-b py-2 px-2">
          <div>
            <TeamOutlined />
            <span className="ml-2">所属角色</span>
          </div>
          <span>超级管理员</span>
        </li>
        <li className="flex justify-between border-b py-2 px-2">
          <div>
            <DatabaseOutlined />
            <span className="ml-2">创建日期</span>
          </div>
          <span>
            {user?.createTime &&
              dayjs(user?.createTime).format(YYYY_MM_DD_HH_mm)}
          </span>
        </li>
      </ol>
    </Card>
  );
};

export default UserInfoCard;
