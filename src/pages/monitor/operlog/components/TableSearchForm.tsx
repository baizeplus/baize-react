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
      <Form.Item label="操作地址" name="operIp">
        <Input
          placeholder="请输入操作地址"
          className="min-w-[230px]"
          allowClear
        />
      </Form.Item>
      <Form.Item label="系统模块" name="title">
        <Input
          placeholder="请输入系统模块"
          className="min-w-[230px]"
          allowClear
        />
      </Form.Item>
      <Form.Item label="操作人员" name="operName">
        <Input
          placeholder="请输入操作人员"
          className="min-w-[230px]"
          allowClear
        />
      </Form.Item>
      <Form.Item label="类型" name="businessType">
        <Select placeholder="请选择操作类型" className="min-w-[230px]" />
      </Form.Item>
      <Form.Item label="状态" name="status">
        <Select placeholder="请选择菜单状态" className="min-w-[230px]" />
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
