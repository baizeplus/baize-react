import { FC } from "react";
import { Button, Flex, Form } from "antd";
import { RedoOutlined, SearchOutlined } from "@ant-design/icons";
import "./queryForm.scss";

type IQueryFormProps = {
  children: React.ReactNode;
  onSearch?: (params: object) => void;
};

const QueryForm: FC<IQueryFormProps> = ({ children, onSearch }) => {
  const [form] = Form.useForm();

  // const handleSearch = () =
  return (
    <Form form={form} onFinish={onSearch} className="query-form w-full">
      <Flex gap="middle" wrap="wrap" className="flex-col md:flex-row">
        {children}
        <Form.Item className="!mb-0 self-end md:self-auto">
          <Flex gap={10}>
            <Button htmlType="submit" icon={<SearchOutlined />} type="primary">
              查询
            </Button>
            <Button icon={<RedoOutlined />} htmlType="reset">
              重置
            </Button>
          </Flex>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default QueryForm;
