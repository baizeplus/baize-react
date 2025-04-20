import { FC } from "react";
import { DatePicker, Form, Input } from "antd";
import { Dayjs } from "dayjs";
const { RangePicker } = DatePicker;
import Query from "@/components/QueryTable";
import { YYYY_MM_DD } from "@/utils/constant";

type ISearchParams = {
  roleName?: string;
  status?: string;
  dataScope?: Dayjs[];
};

type ITableSearchFormProps = {
  onSearch?: (params: ISearchParams) => void;
};

const TableSearchForm: FC<ITableSearchFormProps> = () => {
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
      <Form.Item label="参数名称" name="configName">
        <Input
          placeholder="请输入参数名称"
          allowClear
          className="min-w-[230px]"
        />
      </Form.Item>
      <Form.Item label="参数键名" name="configKey">
        <Input
          placeholder="请输入参数键名"
          allowClear
          className="min-w-[230px]"
        />
      </Form.Item>
      <Form.Item label="系统内置" name="configType">
        <Input
          placeholder="请输入系统内置"
          allowClear
          className="min-w-[230px]"
        />
      </Form.Item>
      <Form.Item label="创建时间" name="dataScope">
        <RangePicker
          className="w-full"
          placeholder={["开始日期", "结束日期"]}
        />
      </Form.Item>
    </Query.Form>
  );
};

export default TableSearchForm;
