import { FC } from "react";
import { Form, Input, Select } from "antd";
import { Dayjs } from "dayjs";
import Query from "@/components/QueryTable";

type ISearchParams = {
  roleName?: string;
  status?: string;
  dataScope?: Dayjs[];
};

type ITableSearchFormProps = {
  onSearch?: (params: ISearchParams) => void;
};

const TableSearchForm: FC<ITableSearchFormProps> = () => {
  return (
    <Query.Form>
      <Form.Item label="公告标题" name="noticeTitle">
        <Input placeholder="请输入公告标题" className="!w-[230px]" />
      </Form.Item>
      <Form.Item label="操作人员" name="createBy">
        <Input placeholder="请输入操作人员" className="!w-[230px]" />
      </Form.Item>
      <Form.Item label="类型" name="noticeType">
        <Select placeholder="请选择公告类型" className="!w-[230px]" />
      </Form.Item>
    </Query.Form>
  );
};

export default TableSearchForm;
