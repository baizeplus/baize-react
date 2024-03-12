import { FC } from "react";
import { DatePicker, Form, Input, Select } from "antd";
import QueryForm from "@/components/QueryForm/QueryForm";
const { RangePicker } = DatePicker;

type ITableSearchFormProps = {
  onSearch: (params: object) => void;
};

const TableSearchForm: FC<ITableSearchFormProps> = ({ onSearch }) => {
  return (
    <QueryForm onSearch={onSearch}>
      <Form.Item label="用户名称" name="userName">
        <Input placeholder="请输入用户名称" className="!w-[230px]" />
      </Form.Item>
      <Form.Item label="手机号码" name="phonenumber">
        <Input placeholder="请输入手机号码" className="!w-[230px]" />
      </Form.Item>
      <Form.Item label="用户状态" name="status">
        <Select placeholder="请选择用户状态" className="!w-[230px]" />
      </Form.Item>
      <Form.Item label="创建时间" name="dateRange">
        <RangePicker
          className="!w-[235px]"
          placeholder={["开始日期", "结束日期"]}
       />
      </Form.Item>
    </QueryForm>
  );
};

export default TableSearchForm;
