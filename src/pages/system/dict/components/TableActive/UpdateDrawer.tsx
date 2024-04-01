import { FC, useCallback } from "react";
import { App, Col, Form, Input, Radio, Row } from "antd";

import QueryTable from "@/components/QueryTable";
import { DrawerWarpper } from "@/components";
import { addType, getType, updateType } from "@/api/system/dict/type";

type IUpdateDrawerProps = {
  children: React.ReactNode;
  id?: React.Key;
};

/** 新增/更新Post数据Drawer */
const UpdateDrawer: FC<IUpdateDrawerProps> = ({ children, id = "" }) => {
  const { message } = App.useApp();
  const { queryFn } = QueryTable.useQueryTable();
  const [form] = Form.useForm();

  /** 请求当前Post数据 */
  const getCurrPost = useCallback(async () => {
    const { data } = await getType(id);
    form.setFieldsValue({
      ...data,
    });
  }, [form, id]);

  /** 执行请求Post数据 */
  const handleMount = () => {
    form.resetFields();
    if (id) {
      getCurrPost();
    } else {
      form.setFieldsValue({
        status: "0",
      });
    }
  };

  /** 提交按钮 */
  const handleSubmit = async () => {
    const values = await form.validateFields();
    const params = {
      ...values,
    };
    id ? await updateType(params) : await addType(params);
    /** 提交成功后重新请求表格数据 */
    message.success(`${id ? "修改" : "新增"}成功`);
    queryFn?.();
  };

  return (
    <DrawerWarpper
      title={id ? "修改字典类型" : "添加字典类型"}
      iconBtn={children}
      onMount={handleMount}
      onSubmit={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item hidden label="dictId" name="dictId">
          <Input />
        </Form.Item>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item
              label="字典名称"
              name="dictName"
              rules={[{ required: true, message: "请输入字典名称" }]}
            >
              <Input placeholder="请输入字典名称" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="字典类型"
              name="dictType"
              rules={[{ required: true, message: "请输入字典类型" }]}
            >
              <Input placeholder="请输入字典类型" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="状态" name="status">
              <Radio.Group>
                <Radio value="0">正常</Radio>
                <Radio value="1">停用</Radio>
              </Radio.Group>
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
