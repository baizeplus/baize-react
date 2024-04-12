import { FC } from "react";
import { Form, Input, Select } from "antd";
import { Dayjs } from "dayjs";
import Query from "@/components/QueryTable";
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
  const [sys_job_status, sys_job_group] = useDict([
    "sys_job_status",
    "sys_job_group",
  ]);

  return (
    <Query.Form>
      <Form.Item label="任务名称" name="jobName">
        <Input placeholder="请输入任务名称" className="!w-[230px]" />
      </Form.Item>
      <Form.Item label="任务组名" name="jobGroup">
        <Select
          allowClear
          placeholder="请输入任务组名"
          className="!w-[230px]"
          options={sys_job_group}
        />
      </Form.Item>
      <Form.Item label="任务状态" name="configType">
        <Select
          allowClear
          placeholder="请选择任务状态"
          className="!w-[230px]"
          options={sys_job_status}
        />
      </Form.Item>
    </Query.Form>
  );
};

export default TableSearchForm;
