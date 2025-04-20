import { FC } from "react";
import { Form, Input } from "antd";
import Query from "@/components/QueryTable";

type ISearchParams = {
  userName?: string;
  phonenumber?: string;
};

type ITableSearchFormProps = {
  onSearch?: (params: ISearchParams) => void;
};

const TableSearchForm: FC<ITableSearchFormProps> = () => {
  return (
    <Query.Form>
      <Form.Item label="用户名称" name="userName">
        <Input placeholder="请输入用户名称" className="!w-[230px]" allowClear />
      </Form.Item>
      <Form.Item label="手机号码" name="phonenumber">
        <Input placeholder="请输入手机号码" className="!w-[230px]" allowClear />
      </Form.Item>
    </Query.Form>
  );
};

export default TableSearchForm;
