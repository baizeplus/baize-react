import { FC, useState } from "react";
import { Button } from "antd";

import { CloudDownloadOutlined } from "@ant-design/icons";
import { exportUser } from "@/api/system/user";
import download from "@/utils/download";

const ExportButton: FC = () => {
  const [loading, setLoading] = useState(false);
  const handleExport = async () => {
    try {
      setLoading(true);
      const data = await exportUser();
      if (data) {
        download(
          data as unknown as BlobPart,
          `user_${new Date().getTime()}.xlsx`,
        );
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      loading={loading}
      type="primary"
      ghost
      onClick={handleExport}
      icon={<CloudDownloadOutlined />}
    >
      导出
    </Button>
  );
};

export default ExportButton;
