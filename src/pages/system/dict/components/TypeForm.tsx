import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Select } from "antd";

const TypeForm: FC = () => {
  const { dictType } = useParams<"dictType">();
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue("dictType", dictType);
  }, [dictType, form]);

  return (
    <>
      <Form.Item label="字典名称" name="dictType">
        <Select placeholder="请选择字典名称" className="!w-[230px]" />
      </Form.Item>
      <Form.Item label="字典标签" name="dictLabel">
        <Input placeholder="请输入字典标签" className="!w-[230px]" />
      </Form.Item>
      <Form.Item label="状态" name="status">
        <Select placeholder="请选择菜单状态" className="!w-[230px]" />
      </Form.Item>
    </>
  );
};

export default TypeForm;
