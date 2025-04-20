import { FC } from "react";
import { DatePicker, Form, Input, Select } from "antd";
import QueryForm from "@/components/QueryForm/QueryForm";
import useDict from "@/hooks/useDict";
const { RangePicker } = DatePicker;

type ITableSearchFormProps = {
  onSearch?: (params: object) => void;
};

const TableSearchForm: FC<ITableSearchFormProps> = ({ onSearch }) => {
  const [sys_normal_disable] = useDict(["sys_normal_disable"]);

  return (
    <QueryForm onSearch={onSearch}>
      <Form.Item label="用户名称" name="userName">
        <Input placeholder="请输入用户名称" className="min-w-[230px]" />
      </Form.Item>
      <Form.Item label="手机号码" name="phonenumber">
        <Input placeholder="请输入手机号码" className="min-w-[230px]" />
      </Form.Item>
      <Form.Item label="状态" name="status">
        <Select
          allowClear
          placeholder="请选择状态"
          className="min-w-[230px]"
          options={sys_normal_disable}
        />
      </Form.Item>
      <Form.Item label="创建时间" name="dataScope">
        <RangePicker
          className="w-full"
          placeholder={["开始日期", "结束日期"]}
        />
      </Form.Item>
    </QueryForm>
  );
};

export default TableSearchForm;
