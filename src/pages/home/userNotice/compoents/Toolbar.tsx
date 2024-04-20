import { FC, useState } from "react";
import { Button, Flex, Radio } from "antd";
import userNoticeStore, { setStatus } from "@/store/userNotice";
import { noticeReadAll } from "@/api/system/notice";

const radioWithOptions = [
  { label: "全部", value: "" },
  { label: "未读", value: "1" },
  { label: "已读", value: "2" },
];
const Toolbar: FC = () => {
  const { status } = userNoticeStore((state) => ({
    status: state.status,
    selectedRowKeys: state.selectedRowKeys,
  }));
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
        {/* <DeleteConfirm
					text={`是否确认删除名称所选通知?`}
					delFn={noticeDelete}
					// onSuccess={handleDelSuccess}
				>
          <Button danger disabled={!selectedRowKeys.length} >删除</Button>
        </DeleteConfirm> */}
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
  );
};

export default Toolbar;
