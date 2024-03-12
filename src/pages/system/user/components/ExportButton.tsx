import { FC, useState } from "react";
import { Button } from "antd";

import { CloudDownloadOutlined } from "@ant-design/icons";
import { exportUser } from "@/api/system/user";

const ExportButton: FC = () => {
  const [loading,  setLoading] = useState(false);
  const handleExport = async () => {
    try {
      setLoading(true);
      const data = await exportUser();
      if (data) {
        const blob = new Blob([data as unknown as BlobPart]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", `user_${new Date().getTime()}.xlsx`);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
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
