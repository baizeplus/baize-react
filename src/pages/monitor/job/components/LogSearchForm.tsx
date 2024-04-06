import { FC } from "react";
import { Form, Input, Select, DatePicker } from "antd";
import { Dayjs } from "dayjs";
import Query from "@/components/QueryTable";
import { YYYY_MM_DD } from "@/utils/constant";

const RangePicker = DatePicker.RangePicker;

type ISearchParams = {
  roleName?: string;
  status?: string;
  dataScope?: Dayjs[];
};

type ITableSearchFormProps = {
  onSearch?: (params: ISearchParams) => void;
};

const LogSearchForm: FC<ITableSearchFormProps> = () => {
  const handleParamsFormat = (params: ISearchParams) => {
    const { dataScope } = params;
    delete params.dataScope;
    const _params = {
      ...params,
      beginTime: dataScope ? dataScope[0]?.format(YYYY_MM_DD) : undefined,
      endTime: dataScope ? dataScope[1]?.format(YYYY_MM_DD) : undefined,
    };
    return _params;
  };

  return (
    <Query.Form onParamsFormat={handleParamsFormat}>
      <Form.Item label="任务名称" name="jobName">
        <Input placeholder="请输入任务名称" className="!w-[230px]" />
      </Form.Item>
      <Form.Item label="任务组名" name="jobGroup">
        <Input placeholder="请输入任务组名" className="!w-[230px]" />
      </Form.Item>
      <Form.Item label="执行状态" name="status">
        <Select placeholder="请选择执行状态" className="!w-[230px]" />
      </Form.Item>
      <Form.Item label="执行状态" name="status">
        <Select placeholder="请选择执行状态" className="!w-[230px]" />
      </Form.Item>
      <Form.Item label="创建时间" name="dataScope">
        <RangePicker
          className="!w-[235px]"
          placeholder={["开始日期", "结束日期"]}
        />
      </Form.Item>
    </Query.Form>
  );
};

export default LogSearchForm;
