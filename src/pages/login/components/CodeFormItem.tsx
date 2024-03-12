import { FC } from "react";
import { SafetyOutlined } from "@ant-design/icons";
import { Form, Space, Input, Spin } from "antd";

type CodeFormItemRef = {
  loading: boolean
  codeImg: string;
  captchaEnabled: boolean;
  getCode: () => void;
};

const CodeFormItem:FC<CodeFormItemRef> = ({ loading, codeImg, captchaEnabled, getCode }) => {
  return (captchaEnabled?
    <>
      <Form.Item name="uuid" hidden>
        <Input hidden />
      </Form.Item>
      <Space size={[8, 0]} align="start">
        <Form.Item
          name="code"
          rules={[{ required: true, message: "请输入验证码" }]}
        >
          <Input
            size="large"
            placeholder="验证码"
            prefix={<SafetyOutlined className="!text-gray-400" />}
          />
        </Form.Item>
        <div
          className={`w-[120px] h-[40px] !bg-gray-100 rounded-lg px-2 ${
            !loading && "cursor-pointer"
          }`}
        >
          <Spin spinning={loading}>
            <img
              src={codeImg}
              alt="code img"
              onClick={() => !loading && getCode()}
            />
          </Spin>
        </div>
      </Space>
    </>:null
  );
};

export default CodeFormItem;
