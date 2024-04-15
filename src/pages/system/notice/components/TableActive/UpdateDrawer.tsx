import { FC, useCallback, useState } from "react";
import { App, Col, Form, Input, Row, Select, TreeSelect } from "antd";

import QueryTable from "@/components/QueryTable";
import { DrawerWarpper, Editor } from "@/components";
import { addNotice, getNotice, updateNotice } from "@/api/system/notice";
import { getDeptList } from "@/api/system/dept";
import { handleTree } from "@/utils/baize";
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
  const [sys_notice_type] = useDict(["sys_notice_type"]);
  const [deptOptions, setDeptOptions] = useState<IDeptItem[]>([]);

  /** 请求当前Post数据 */
  const getCurrPost = useCallback(async () => {
    const { data } = await getNotice(id);
    form.setFieldsValue({
      status: "0",
      ...data,
    });
  }, [form, id]);

  const getDeptOptions = async () => {
    const { data } = await getDeptList();
    // const dateNodeList = data.map((item: IDeptItem) => ({ title: item.deptName, key: item.deptId, parentId: item.parentId}))
    setDeptOptions(handleTree(data, "deptId", "parentId"));
  };

  /** 执行请求Config数据 */
  const handleMount = () => {
    form.resetFields();
    getDeptOptions();
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
      deptIds: values.deptIds.map((item: { value: string }) => item.value),
    };
    id ? await updateNotice(params) : await addNotice(params);
    /** 提交成功后重新请求表格数据 */
    queryFn?.();
    message.success(`${id ? "修改" : "新增"}成功`);
  };

  return (
    <DrawerWarpper
      width={800}
      isEdit={!id}
      title={id ? "查看公告" : "新增公告"}
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
              name="title"
              rules={[{ required: true, message: "请选择公告标题" }]}
            >
              <Input placeholder="请输入公告标题" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="公告类型"
              name="type"
              rules={[{ required: true, message: "请输选择公告类型" }]}
            >
              <Select
                placeholder="请输选择公告类型"
                options={sys_notice_type}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="发送部门" name="deptIds">
              <TreeSelect
                treeCheckable
                treeCheckStrictly
                multiple
                placeholder="请输选择发布部门"
                showCheckedStrategy={TreeSelect.SHOW_PARENT}
                treeDefaultExpandAll
                fieldNames={{ label: "deptName", value: "deptId" }}
                treeData={deptOptions}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="内容" name="txt">
              {/* <Input.TextArea placeholder="请输公告内容" rows={6} /> */}
              <Editor />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DrawerWarpper>
  );
};

export default UpdateDrawer;
