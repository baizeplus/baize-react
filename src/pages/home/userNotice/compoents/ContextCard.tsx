import { FC } from "react";
import { Card, Divider, Flex, Typography, Empty } from "antd";
import { DictTag } from "@/components";
import useDict from "@/hooks/useDict";
import userNoticeStore from "@/store/userNotice";
import dayjs from "dayjs";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";

const ContextCard: FC = () => {
  const [sys_notice_type] = useDict(["sys_notice_type"]);
  const noticeData = userNoticeStore((state) => state.noticeData);

  return noticeData ? (
    <Card>
      <Typography.Title level={3}>{noticeData?.title}</Typography.Title>
      <Flex gap={8}>
        <Typography.Text className="font-semibold">
          {noticeData.createName}
        </Typography.Text>
        <Typography.Text>
          {noticeData.createTime &&
            dayjs(noticeData.createTime).format(YYYY_MM_DD_HH_mm)}
        </Typography.Text>
        <DictTag options={sys_notice_type} value={noticeData.type} />
      </Flex>
      <Divider />
      <div dangerouslySetInnerHTML={{ __html: noticeData.txt ?? "" }} />
    </Card>
  ) : (
    <Card>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="暂无预览项，请在左侧选择消息"
      />
    </Card>
  );
};

export default ContextCard;
