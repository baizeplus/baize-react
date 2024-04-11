import { FC, useCallback } from "react";
import { App, Col, Form, Input, InputNumber, Radio, Row } from "antd";

import QueryTable from "@/components/QueryTable";
import { DrawerWarpper } from "@/components";
import { getPost, addPost, updatePost } from "@/api/system/post";
import useDict from "@/hooks/useDict";

type IUpdateDrawerProps = {
  children: React.ReactNode;
  id?: React.Key;
  parentId?: string;
};

/** 新增/更新Post数据Drawer */
const UpdateDrawer: FC<IUpdateDrawerProps> = ({ children, id = "" }) => {
  const { message } = App.useApp();
  const { queryFn } = QueryTable.useQueryTable();
  const [form] = Form.useForm();
  const [sys_normal_disable] = useDict(["sys_normal_disable"]);

  /** 请求当前Post数据 */
  const getCurrPost = useCallback(async () => {
    const { data } = await getPost(id);
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
    id ? await updatePost(params) : await addPost(params);
    /** 提交成功后重新请求表格数据 */
    message.success(`${id ? "修改" : "新增"}成功`);
    queryFn?.();
  };

  return (
    <DrawerWarpper
      title={id ? "修改岗位" : "添加岗位"}
      iconBtn={children}
      onMount={handleMount}
      onSubmit={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item hidden label="postId" name="postId">
          <Input />
        </Form.Item>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item
              label="岗位名称"
              name="postName"
              rules={[{ required: true, message: "请选择岗位名称" }]}
            >
              <Input placeholder="请输入岗位名称" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="岗位编号"
              name="postCode"
              rules={[{ required: true, message: "请输入岗位编号" }]}
            >
              <Input placeholder="请输入岗位名称" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="岗位顺序"
              name="postSort"
              rules={[{ required: true, message: "请输入岗位顺序" }]}
            >
              <InputNumber
                min={0}
                placeholder="请输入岗位顺序"
                className="!w-full"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="岗位状态" name="status">
              <Radio.Group options={sys_normal_disable} />
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
