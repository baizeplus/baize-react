import { FC } from "react";
import { Tabs, TabsProps } from "antd";
import userNoticeStore, { setNoticeType } from "@/store/userNotice";

const items: TabsProps["items"] = [
  {
    key: "",
    label: "全部",
  },
  {
    key: "1",
    label: "通知",
  },
  {
    key: "2",
    label: "公告",
  },
];

const NoticeTabs: FC = () => {
  const { noticeType } = userNoticeStore((state) => ({
    noticeType: state.noticeType,
    status: state.status,
  }));

  return (
    <Tabs
      activeKey={noticeType}
      onChange={(value: string) => setNoticeType(value as typeof noticeType)}
      items={items}
    />
  );
};

export default NoticeTabs;
