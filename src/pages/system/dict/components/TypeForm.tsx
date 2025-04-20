import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Select } from "antd";
import useDict from "@/hooks/useDict";

const TypeForm: FC = () => {
  const { dictType } = useParams<"dictType">();
  const [sys_normal_disable] = useDict(["sys_normal_disable"]);
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue("dictType", dictType);
  }, [dictType, form]);

  return (
    <>
      <Form.Item label="字典名称" name="dictType">
        <Select
          placeholder="请选择字典名称"
          className="min-w-[230px]"
          allowClear
        />
      </Form.Item>
      <Form.Item label="字典标签" name="dictLabel">
        <Input
          placeholder="请输入字典标签"
          className="min-w-[230px]"
          allowClear
        />
      </Form.Item>
      <Form.Item label="状态" name="status">
        <Select
          allowClear
          placeholder="请选择数据状态"
          className="min-w-[230px]"
          options={sys_normal_disable}
        />
      </Form.Item>
    </>
  );
};

export default TypeForm;
