import { FC } from "react";
import { DatePicker, Form, Input, Select } from "antd";
import Query from "@/components/QueryTable";
import { YYYY_MM_DD } from "@/utils/constant";
import { Dayjs } from "dayjs";
import useDict from "@/hooks/useDict";
const { RangePicker } = DatePicker;

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
      <Form.Item label="角色名称" name="roleName">
        <Input placeholder="请输入角色名称" className="!w-[230px]" />
      </Form.Item>
      <Form.Item label="权限字符" name="roleKey">
        <Input placeholder="请输入权限字符" className="!w-[230px]" />
      </Form.Item>
      <Form.Item label="状态" name="status">
        <Select
          allowClear
          placeholder="请选择状态"
          className="!w-[230px]"
          options={sys_normal_disable}
        />
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

export default TableSearchForm;
