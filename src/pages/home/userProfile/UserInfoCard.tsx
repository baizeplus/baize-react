import { FC, useState } from "react";
import { App, Avatar, Card, Flex, Spin, Typography, Upload } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  DatabaseOutlined,
  ApartmentOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import ImgCrop from "antd-img-crop";
import { RcFile } from "antd/es/upload";
import { uploadAvatar } from "@/api/user";
import { setAvatar } from "@/store/user";

type IUserInfoCardProps = {
  user: IUserProfile | null;
  onUpdate: () => void;
};

const UserInfoCard: FC<IUserInfoCardProps> = ({ user, onUpdate }) => {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。");
    }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('Image must smaller than 2MB!');
    // }
    return isJpgOrPng;
  };

  const handleUpload = async (value: unknown) => {
    try {
      setLoading(true);
      const file = value as File;
      const formData = new FormData();
      formData.append("avatarfile", file, file.name);
      const { data } = await uploadAvatar(formData);
      setAvatar(data);
      onUpdate();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="个人信息">
      <Flex justify="center">
        <Spin spinning={loading}>
          <ImgCrop
            rotationSlider
            quality={1}
            modalTitle="修改头像"
            modalOk="提交"
            modalCancel="取消"
            beforeCrop={beforeUpload}
            onModalOk={handleUpload}
          >
            <Upload
              maxCount={1}
              showUploadList={false}
              customRequest={() => null}
            >
              <div className="border-[1px]  border-white hover:border-blue-500 border-dashed rounded-full	p-2 cursor-pointer">
                <Avatar src={user?.avatar} size={120} icon={<UserOutlined />} />
              </div>
            </Upload>
          </ImgCrop>
        </Spin>
      </Flex>
      <ol className="mt-6 border-t">
        <li className="flex justify-between border-b py-2 px-2">
          <div>
            <UserOutlined />
            <span className="ml-2">用户名称</span>
          </div>
          <span>{user?.userName}</span>
        </li>
        <li className="flex justify-between border-b py-2 px-2">
          <div>
            <PhoneOutlined />
            <span className="ml-2">手机号码</span>
          </div>
          <Typography.Text copyable>{user?.phonenumber}</Typography.Text>
        </li>
        <li className="flex justify-between border-b py-2 px-2">
          <div>
            <MailOutlined />
            <span className="ml-2">用户邮箱</span>
          </div>
          <Typography.Text copyable>{user?.email}</Typography.Text>
        </li>
        <li className="flex justify-between border-b py-2 px-2">
          <div>
            <ApartmentOutlined />
            <span className="ml-2">所属部门</span>
          </div>
          <span>{user?.deptName}</span>
        </li>
        <li className="flex justify-between border-b py-2 px-2">
          <div>
            <TeamOutlined />
            <span className="ml-2">所属角色</span>
          </div>
          <span>超级管理员</span>
        </li>
        <li className="flex justify-between border-b py-2 px-2">
          <div>
            <DatabaseOutlined />
            <span className="ml-2">创建日期</span>
          </div>
          <span>
            {user?.createTime &&
              dayjs(user?.createTime).format(YYYY_MM_DD_HH_mm)}
          </span>
        </li>
      </ol>
    </Card>
  );
};

export default UserInfoCard;
