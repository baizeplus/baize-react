import { FC, useCallback, useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

import loginLogoImg from "@/assets/images/loginLogo.png";
import { decrypt, encrypt } from "@/utils/jsencrypt";
import CodeFormItem from "./CodeFormItem";
import { login } from "@/api/login";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "@/utils/auth";
import useCaptcCode from "../useCaptcCode";

type ILoginForm = ILogin & { rememberMe: boolean };

const baseForm = {
  username: "admin",
  password: "admin123",
  rememberMe: false,
  code: "",
  uuid: "",
};

const LoginForm: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { uuid, registerEnabled, captchaEnabled, loading: codeLoading, img: codeImg, getCode } = useCaptcCode();

  const getCookie = useCallback(() => {
    const username = Cookies.get("username");
    const password = Cookies.get("password");
    const rememberMe = Cookies.get("rememberMe");
    form.setFieldsValue({
      username: username === undefined ? baseForm.username : username,
      password: password === undefined ? baseForm.password : decrypt(password),
      rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
    });
  }, [form]);

  const setCookie = (values: ILoginForm) => {
    Cookies.set("username", values.username, { expires: 30 });
    Cookies.set("password", encrypt(values.password), { expires: 30 });
    Cookies.set("rememberMe", String(values.rememberMe), { expires: 30 });
  };

  useEffect(() => {
    getCookie();
  }, [getCookie]);

  const handleLogin = async (values: ILoginForm) => {
    setLoading(true);
    try {
      // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
      if (values.rememberMe) {
        setCookie(values);
      }
      const params = {
        ...values,
        uuid,
        username: values.username.trim(),
      };
      const { data } = await login(params);
      if (data) {
        setToken(data);
        navigate("/index");
      } else {
        getCode();
      }
    } catch (error) {
      getCode();
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleLogin}
      className="relative w-[380px] !bg-white !p-[24px] !pb-0 rounded-lg shadow-lg"
    >
      <img
        src={loginLogoImg}
        alt="loginLogo"
        className="absolute top-[-132px] left-[-4px] w-[264px]"
      />
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
      {/* 验证码Form Item */}

      <CodeFormItem loading={codeLoading} codeImg={codeImg} captchaEnabled={captchaEnabled} getCode={getCode}/>
      <Form.Item name="rememberMe" valuePropName="checked">
        <Checkbox>记住密码</Checkbox>
      </Form.Item>
      <Button
        type="primary"
        size="large"
        htmlType="submit"
        className="mb-2"
        block
        loading={loading}
      >
        {loading ? "登 录 中..." : "登 录"}
      </Button>
      {
        registerEnabled && <div className="pb-6">
          <Link to="/register" className="text-xs">
            立即注册
          </Link>
        </div>
      }
    </Form>
  );
};

export default LoginForm;
