import { FC, useState } from "react";
import { Button } from "antd";

import { CloudDownloadOutlined } from "@ant-design/icons";
import download from "@/utils/download";

type IExportButtonProps = {
  fileName?: string;
  fileNamePrefix?: string;
  exportFn: () => Promise<unknown>;
};

const ExportButton: FC<IExportButtonProps> = ({
  fileName,
  fileNamePrefix,
  exportFn,
}) => {
  const [loading, setLoading] = useState(false);
  const handleExport = async () => {
    try {
      setLoading(true);
      const data = await exportFn();
      if (data) {
        download(
          data as unknown as BlobPart,
          fileName || `${fileNamePrefix + "_"}${new Date().getTime()}.xlsx`,
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
