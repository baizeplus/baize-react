import { FC } from "react";
import { Form, Input, Select } from "antd";
import Query from "@/components/QueryTable";
import { Dayjs } from "dayjs";
import useDict from "@/hooks/useDict";

type ISearchParams = {
  roleName?: string;
  status?: string;
  dataScope?: Dayjs[];
};

type ITableSearchFormProps = {
  onSearch?: (params: ISearchParams) => void;
};

const TableSearchForm: FC<ITableSearchFormProps> = () => {
  const [sys_normal_disable] = useDict(["sys_normal_disable"]);

  return (
    <Query.Form>
      <Form.Item label="权限名称" name="permissionName">
        <Input
          placeholder="请输入权限名称"
          className="min-w-[230px]"
          allowClear
        />
      </Form.Item>
      <Form.Item label="状态" name="status">
        <Select
          allowClear
          placeholder="请选择权限状态"
          className="min-w-[230px]"
          options={sys_normal_disable}
        />
      </Form.Item>
    </Query.Form>
  );
};

export default TableSearchForm;
