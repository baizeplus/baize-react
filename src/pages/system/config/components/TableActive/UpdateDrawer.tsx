import { FC, useCallback } from "react";
import { App, Col, Form, Input, Radio, Row } from "antd";

import QueryTable from "@/components/QueryTable";
import { DrawerWarpper } from "@/components";
import { addConfig, getConfig, updateConfig } from "@/api/system/config";
import useDict from "@/hooks/useDict";

type IUpdateDrawerProps = {
  children: React.ReactNode;
  id?: React.Key;
  parentId?: string;
};

/** 新增/更新Config数据Drawer */
const UpdateDrawer: FC<IUpdateDrawerProps> = ({ children, id = "" }) => {
  const { message } = App.useApp();
  const { queryFn } = QueryTable.useQueryTable();
  const [form] = Form.useForm();
  const [sys_yes_no] = useDict(["sys_yes_no"]);

  /** 请求当前Post数据 */
  const getCurrPost = useCallback(async () => {
    const { data } = await getConfig(id);
    form.setFieldsValue({
      configType: "Y",
      ...data,
    });
  }, [form, id]);

  /** 执行请求Config数据 */
  const handleMount = () => {
    form.resetFields();

    if (id) {
      getCurrPost();
    } else {
      form.setFieldsValue({
        configType: "Y",
      });
    }
  };

  /** 提交按钮 */
  const handleSubmit = async () => {
    const values = await form.validateFields();
    const params = {
      ...values,
    };
    id ? await updateConfig(params) : await addConfig(params);
    /** 提交成功后重新请求表格数据 */
    queryFn?.();
    message.success(`${id ? "修改" : "新增"}成功`);
  };

  return (
    <DrawerWarpper
      title={id ? "修改参数" : "添加参数"}
      iconBtn={children}
      onMount={handleMount}
      onSubmit={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item hidden label="configId" name="configId">
          <Input />
        </Form.Item>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item
              label="参数名称"
              name="configName"
              rules={[{ required: true, message: "请选择参数名称" }]}
            >
              <Input placeholder="请输入参数名称" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="参数键名"
              name="configKey"
              rules={[{ required: true, message: "请输入参数键名" }]}
            >
              <Input placeholder="请输入参数键名" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="参数键值"
              name="configValue"
              rules={[{ required: true, message: "请输入参数键值" }]}
            >
              <Input placeholder="请输入参数键值" className="!w-full" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="系统内置" name="configType">
              <Radio.Group options={sys_yes_no} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="备注" name="remark">
              <Input.TextArea placeholder="请输入备注" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DrawerWarpper>
  );
};

export default UpdateDrawer;
