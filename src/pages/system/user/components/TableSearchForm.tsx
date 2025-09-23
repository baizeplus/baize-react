import { FC, useEffect } from "react";
import { DatePicker, Form, Input, Select } from "antd";
import Query from "@/components/QueryTable";
import useDict from "@/hooks/useDict";
import { YYYY_MM_DD } from "@/utils/constant";
const { RangePicker } = DatePicker;

type ITableSearchFormProps = {
  deptId?: string;
};

const TableSearchForm: FC<ITableSearchFormProps> = ({ deptId }) => {
  const [sys_normal_disable] = useDict(["sys_normal_disable"]);
  const { setParams } = Query.useQueryTable();

  // 监听 deptId 变化，自动更新查询参数
  useEffect(() => {
    if (deptId !== undefined) {
      setParams({ deptId });
    }
  }, [deptId, setParams]);

  const handleParamsFormat = (values: any) => {
    return {
      ...values,
      deptId,
      beginTime: values?.dataScope?.[0]?.format(YYYY_MM_DD) || "",
      endTime: values?.dataScope?.[1]?.format(YYYY_MM_DD) || "",
    };
  };

  return (
    <Query.Form onParamsFormat={handleParamsFormat}>
      <Form.Item label="用户名称" name="userName">
        <Input placeholder="请输入用户名称" className="min-w-[230px]" />
      </Form.Item>
      <Form.Item label="手机号码" name="phonenumber">
        <Input placeholder="请输入手机号码" className="min-w-[230px]" />
      </Form.Item>
      <Form.Item label="状态" name="status">
        <Select
          allowClear
          placeholder="请选择状态"
          className="min-w-[230px]"
          options={sys_normal_disable}
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
