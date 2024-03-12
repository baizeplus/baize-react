import { FC, useRef, useState } from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { encrypt } from "@/utils/jsencrypt";
import CodeFormItem from "./CodeFormItem";
import { Link } from "react-router-dom";
import { register } from "@/api/login";
import useCaptcCode from "../useCaptcCode";


const RegisterForm: FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { uuid, captchaEnabled, loading: codeLoading, img: codeImg, getCode } = useCaptcCode();


  const handleRegister = async (values: IRegister) => {
    setLoading(true);
    try {
      const params = {
        ...values,
        uuid,
        password: encrypt(values.password),
      }
      const { data } = await register(params);
    } catch(error) {
      getCode();
      console.log('error', error);

    } finally {
      setLoading(false);
    }
  }

  return (
    <Form form={form} onFinish={handleRegister} className="relative w-[380px]  bg-white !p-[24px] !pb-0 rounded-lg shadow-lg">
      <h1 className="text-center mb-4 font-normal text-lg text-[#707070]">
        白泽后台管理系统
      </h1>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入您的账号" }]}
      >
        <Input
          size="large"
          placeholder="账号"
          prefix={<UserOutlined className="!text-gray-400" />}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入您的密码" }]}
      >
        <Input.Password
          size="large"
          placeholder="密码"
          prefix={<LockOutlined className="!text-gray-400" />}
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        rules={[{ required: true, message: "请再次输入您的密码" }, ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('两次输入的密码不一致'));
          },
        }),]}
        dependencies={['password']}
      >
        <Input.Password
          size="large"
          placeholder="确认密码"
          prefix={<LockOutlined className="!text-gray-400" />}
        />
      </Form.Item>
      {/* 验证码Form Item */}
      <CodeFormItem loading={codeLoading} codeImg={codeImg} captchaEnabled={captchaEnabled} getCode={getCode} />

      <Button type="primary" size="large" htmlType="submit" block loading={loading}>
        { loading ? '注册中' : '注册' }
      </Button>
      <Form.Item>
        <Link to="/login" className="text-xs">使用已有账户登录</Link>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
