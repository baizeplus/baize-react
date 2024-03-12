import { FC } from "react";
import { Card, Tabs, TabsProps } from "antd";
import BaseInfo from "./BaseInfo";
import ResetPwd from "./ResetPwd";

type IBaseInfoCardProps = {
  user: IUserProfile | null;
}

const BaseInfoCard: FC<IBaseInfoCardProps> = ({ user }) => {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '基本资料',
      children: <BaseInfo user={user}/>,
    },
    {
      key: '2',
      label: '修改密码',
      children: <ResetPwd />,
    },
  ]; 

  return (
    <Card title="基本资料">
      <Tabs
        defaultActiveKey="1"
        items={items}
      />
    </Card>
  )
};

export default BaseInfoCard;
