import { FC, useCallback } from "react";
import { App, Col, Form, Input, Radio, Row, Select } from "antd";

import QueryTable from "@/components/QueryTable";
import { DrawerWarpper } from "@/components";
import { addNotice, getNotice, updateNotice } from "@/api/system/notice";

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

  /** 请求当前Post数据 */
  const getCurrPost = useCallback(async () => {
    const { data } = await getNotice(id);
    form.setFieldsValue({
      status: "0",
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
    id ? await updateNotice(params) : await addNotice(params);
    /** 提交成功后重新请求表格数据 */
    queryFn?.();
    message.success(`${id ? "修改" : "新增"}成功`);
  };

  return (
    <DrawerWarpper
      title={id ? "修改公告" : "添加公告"}
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
              label="公告标题"
              name="noticeTitle"
              rules={[{ required: true, message: "请选择公告标题" }]}
            >
              <Input placeholder="请输入公告标题" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="公告类型"
              name="noticeType"
              rules={[{ required: true, message: "请输选择公告类型" }]}
            >
              <Select placeholder="请输选择公告类型" />
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
            <Form.Item label="内容" name="noticeContent">
              <Input.TextArea placeholder="请输公告内容" rows={6} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DrawerWarpper>
  );
};

export default UpdateDrawer;
