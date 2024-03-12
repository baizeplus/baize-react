import { resetUserPwd } from "@/api/system/user";
import { App, Form, Input, Modal } from "antd";
import { FC, ReactNode, useState } from "react";

type IResetPwdModalProps = {
  id: IUserItem["userId"];
  name: IUserItem["userName"];
  children?: ReactNode;
};

const ResetPwdModal: FC<IResetPwdModalProps> = ({ children, id, name }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    const { password } = await form.validateFields();
    try {
      setLoading(true);
      await resetUserPwd(id, password);
      message.success(`修改成功，新密码是：${password}`);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div onClick={() => setOpen(true)}>{children || "重置密码"}</div>
      <Modal
        open={open}
        title="重置密码"
        onOk={handleFinish}
        onCancel={() => setOpen(false)}
        okText="确定"
        cancelText="取消"
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item label={`请输入"${name}"的新密码`} name="password" 
            rules={[
              { required: true, message: `请输入"${name}"的新密码` },
              { pattern: /^.{5,20}$/, message: '用户密码长度必须介于 5 和 20 之间' }
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ResetPwdModal;
