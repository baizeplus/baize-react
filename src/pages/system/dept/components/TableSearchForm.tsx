import { FC } from "react";
import { Form, Input, Select } from "antd";
import Query from "@/components/QueryTable";
import { Dayjs } from "dayjs";

type ISearchParams = {
  roleName?: string;
  status?: string;
  dataScope?: Dayjs[];
};

type ITableSearchFormProps = {
  onSearch?: (params: ISearchParams) => void;
};

const TableSearchForm: FC<ITableSearchFormProps> = () => {
  return (
    <Query.Form>
      <Form.Item label="部门名称" name="deptName">
        <Input placeholder="请输入菜单名称" className="!w-[230px]" />
      </Form.Item>
      <Form.Item label="状态" name="status">
        <Select placeholder="请选择菜单状态" className="!w-[230px]" />
      </Form.Item>
    </Query.Form>
  );
};

export default TableSearchForm;
