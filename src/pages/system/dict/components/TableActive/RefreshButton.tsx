import { FC, useState } from "react";
import { App, Button } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { refreshCache } from "@/api/system/dict/type";

const RefreshButton: FC = () => {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);

  const handleRefreshCache = async () => {
    try {
      setLoading(true);
      await refreshCache();
      message.success("刷新缓存成功");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      danger
      icon={<RedoOutlined />}
      loading={loading}
      onClick={handleRefreshCache}
    >
      刷新缓存
    </Button>
  );
};

export default RefreshButton;
