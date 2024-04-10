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
      <Form.Item label="菜单名称" name="menuName">
        <Input placeholder="请输入菜单名称" className="!w-[230px]" />
      </Form.Item>
      <Form.Item label="状态" name="status">
        <Select
          allowClear
          placeholder="请选择菜单状态"
          className="!w-[230px]"
          options={sys_normal_disable}
        />
      </Form.Item>
    </Query.Form>
  );
};

export default TableSearchForm;
