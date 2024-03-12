import { FC, useEffect } from "react";
import { App, Button, Flex, Form, Input, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "@/api/user";

type IBaseInfoProps = {
  user: IUserProfile | null;
}

const BaseInfo:FC<IBaseInfoProps> = ({ user }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  useEffect(() => {
    form.setFieldsValue({
      ...user,
    });
  }, [form, user]);

  const handleFinish = async (values: IUpdateUserBaseInfo) => {
    await updateUserProfile(values);
    form.resetFields();
    message.success('修改成功');
  };

  const handleClosePage = () => {
    navigate(-1);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
    >
      <Form.Item name="nickName" label="用户昵称" rules={[{ required: true, message: '请输入用户昵称' }]}>
        <Input placeholder="用户昵称"/>
      </Form.Item>
      <Form.Item name="phonenumber" label="手机号码" rules={[{ required: true, message: '请输入手机号码' }, { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码" }]}>
        <Input placeholder="手机号码"/>
      </Form.Item>
      <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }, { type: "email", message: "请输入正确的邮箱地址" }]}>
        <Input placeholder="邮箱"/>
      </Form.Item>
      <Form.Item name="sex" label="性别" rules={[{ required: true, message: '请输入性别' }]}>
        <Radio.Group defaultValue={'0'}>
          <Radio value="0">男</Radio>
          <Radio value="1">女</Radio>
        </Radio.Group>
      </Form.Item>
      <Flex gap="middle">
        <Button type="primary" htmlType="submit" size="middle">保存</Button>
        <Button type="primary" danger size="middle" onClick={handleClosePage}>关闭</Button>
      </Flex>
    </Form>
  );

};

export default BaseInfo;