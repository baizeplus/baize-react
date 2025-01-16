import { FC } from "react";
import { Form, Input } from "antd";
import { Dayjs } from "dayjs";
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
      <Form.Item label="登录地址" name="ipaddr">
        <Input placeholder="请输入登录地址" className="!w-[230px]" />
      </Form.Item>
      <Form.Item label="用户名称" name="userName">
        <Input placeholder="请输入用户名称" className="!w-[230px]" />
      </Form.Item>
    </Query.Form>
  );
};

export default TableSearchForm;
