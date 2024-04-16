import { BellOutlined } from "@ant-design/icons";
import { Badge, Popover, Table, Tooltip } from "antd";
import { useState } from "react";

const NoticeBtn = () => {
  const [clicked, setClicked] = useState(false);

  const columns = [
    {
      title: "",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "",
      dataIndex: "createName",
      key: "createName",
    },
  ];

  return (
    <Tooltip placement="top" title="消息">
      <Popover
        placement="bottomRight"
        overlayClassName="w-[42git reset --hard upstream/master 0px]"
        content={<Table showHeader={false} columns={columns} />}
        trigger="click"
        open={clicked}
        onOpenChange={() => setClicked(!clicked)}
      >
        <Badge dot offset={[-4, 4]} className="!mr-3">
          <BellOutlined className="text-[20px]" />
        </Badge>
      </Popover>
    </Tooltip>
  );
};

export default NoticeBtn;
