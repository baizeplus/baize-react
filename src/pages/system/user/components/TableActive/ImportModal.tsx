import { FC, useState } from "react";
import {
  App,
  Button,
  Checkbox,
  GetProp,
  Modal,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import { exportUserTemplate, importUser } from "@/api/system/user";
import download from "@/utils/download";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const { Dragger } = Upload;

const ImportModal: FC = () => {
  const { message } = App.useApp();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<UploadFile>();

  const props: UploadProps = {
    name: "file",
    multiple: false,
    fileList: [file] as UploadFile[],
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
    // onDrop(e) {
    //   console.log("Dropped files", e.dataTransfer.files);
    // },
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file as FileType);
    try {
      setUploading(true);
      await importUser(formData, checked);
      message.success("导入成功");
    } finally {
      setUploading(false);
    }
  };

  const handleExportTemplate = async () => {
    try {
      setExportLoading(true);
      const data = await exportUserTemplate();
      if (data) {
        download(
          data as unknown as BlobPart,
          `user_template_${new Date().getTime()}.xlsx`,
        );
      }
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        type="primary"
        ghost
        icon={<CloudUploadOutlined />}
      >
        导入
      </Button>
      <Modal
        open={open}
        title="用户导入"
        onOk={handleUpload}
        confirmLoading={uploading}
        onCancel={() => setOpen(false)}
      >
        <div className="py-4">
          <Dragger {...props}>
            <p className="text-6xl text-gray-300 mt-2 mb-4">
              <CloudUploadOutlined />
            </p>
            <p className="text-gray-500 mb-4">
              将文件拖到此处，或<span className="text-primary">点击上传</span>
            </p>
          </Dragger>
          <div className="text-center	mt-4 text-gray-500">
            <Checkbox checked={checked} onClick={() => setChecked((f) => !f)}>
              <span className="text-gray-500 text-xs font-normal">
                是否更新已经存在的用户数据{" "}
              </span>{" "}
            </Checkbox>
            <p className=" text-xs">
              仅允许导入xls、xlsx格式文件。{" "}
              <Button
                onClick={handleExportTemplate}
                type="link"
                className="!p-0"
                loading={exportLoading}
              >
                下载模板
              </Button>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImportModal;
