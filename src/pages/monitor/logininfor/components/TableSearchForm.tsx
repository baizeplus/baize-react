import { FC } from "react";
import { Form, Input, DatePicker, Select } from "antd";
import { Dayjs } from "dayjs";
import Query from "@/components/QueryTable";
import { YYYY_MM_DD } from "@/utils/constant";
import useDict from "@/hooks/useDict";
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
  const [sys_common_status] = useDict(["sys_common_status"]);

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
      <Form.Item label="登录地址" name="ipaddr">
        <Input
          placeholder="请输入登录地址"
          className="min-w-[230px]"
          allowClear
        />
      </Form.Item>
      <Form.Item label="用户名称" name="userName">
        <Input
          placeholder="请输入用户名称"
          className="min-w-[230px]"
          allowClear
        />
      </Form.Item>
      <Form.Item label="状态" name="status">
        <Select
          placeholder="请选择登录状态"
          className="min-w-[230px]"
          options={sys_common_status}
        />
      </Form.Item>
      <Form.Item label="登录时间" name="dataScope">
        <RangePicker
          className="w-full"
          placeholder={["开始日期", "结束日期"]}
        />
      </Form.Item>
    </Query.Form>
  );
};

export default TableSearchForm;
