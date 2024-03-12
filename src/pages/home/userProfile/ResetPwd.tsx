import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { App, Button, Flex, Form, Input } from "antd";
import { updateUserPwd } from "@/api/user";

const ResetPwd: FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: { oldPassword: string; newPassword: string; confirmPassword?: string }) => {
    try {
      setLoading(true);
      delete values.confirmPassword;
      await updateUserPwd(values);
      form.resetFields();
      message.success('修改成功');
    } finally {
      setLoading(false);
    }
  };


  const handleClosePage = () => {
    navigate(-1);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        name="oldPassword"
        label="旧密码"
        rules={[{ required: true, message: "请输入旧密码" }]}
      >
        <Input.Password placeholder="旧密码" />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="新密码"
        rules={[{ required: true, message: "请输入新密码" }, { min: 6, max: 20, message: "长度在 6 到 20 个字符" }]}
      >
        <Input.Password placeholder="新密码" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="确认密码"
        rules={[
          { required: true, message: "请再次输入您的密码" }, 
          ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('newPassword') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('两次输入的密码不一致'));
          },
        }),]}
        dependencies={['newPassword']}
      >
        <Input.Password placeholder="确认密码" />
      </Form.Item>
      
      
      <Flex gap="middle">
        <Button type="primary" htmlType="submit" size="middle" loading={loading}>
          保存
        </Button>
        <Button type="primary" danger size="middle" onClick={handleClosePage}>
          关闭
        </Button>
      </Flex>
    </Form>
  );
};

export default ResetPwd;
