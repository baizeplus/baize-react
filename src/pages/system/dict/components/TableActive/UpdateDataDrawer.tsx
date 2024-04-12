import React, { FC, useCallback } from "react";
import { App, Col, Form, Input, InputNumber, Radio, Row, Select } from "antd";

import QueryTable from "@/components/QueryTable";
import { DrawerWarpper } from "@/components";
import {
  addDictData,
  getDictData,
  updateDictData,
} from "@/api/system/dict/data";
import { useParams } from "react-router-dom";
import useDict from "@/hooks/useDict";

type IUpdateDataDrawerProps = {
  children: React.ReactNode;
  id?: React.Key;
};

/** 新增/更新Post数据Drawer */
const UpdateDataDrawer: FC<IUpdateDataDrawerProps> = ({
  children,
  id = "",
}) => {
  const { dictType } = useParams<"dictType">();
  const { message } = App.useApp();
  const { queryFn } = QueryTable.useQueryTable();
  const [sys_normal_disable] = useDict(["sys_normal_disable"]);
  const [form] = Form.useForm();

  /** 请求当前Post数据 */
  const getCurrData = useCallback(async () => {
    const { data } = await getDictData(id);
    form.setFieldsValue({
      ...data,
    });
  }, [form, id]);

  /** 执行请求Post数据 */
  const handleMount = () => {
    form.resetFields();
    form.setFieldsValue({
      dictType,
      listClass: "default",
    });
    if (id) {
      getCurrData();
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
    id ? await updateDictData(params) : await addDictData(params);
    /** 提交成功后重新请求表格数据 */
    message.success(`${id ? "修改" : "新增"}成功`);
    queryFn?.();
  };

  return (
    <DrawerWarpper
      title={id ? "修改字典数据" : "添加字典数据"}
      iconBtn={children}
      onMount={handleMount}
      onSubmit={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item hidden label="dictCode" name="dictCode">
          <Input />
        </Form.Item>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item
              label="字典类型"
              name="dictType"
              rules={[{ required: true, message: "请输入字典类型" }]}
            >
              <Input placeholder="请输入字典类型" disabled />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="数据标签"
              name="dictLabel"
              rules={[{ required: true, message: "请输入数据标签" }]}
            >
              <Input placeholder="请输入数据标签" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="数据键值"
              name="dictValue"
              rules={[{ required: true, message: "请输入数据键值" }]}
            >
              <Input placeholder="请输入数据键值" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="样式属性" name="cssClass">
              <Input placeholder="请输入样式属性" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="显示排序"
              name="dictSort"
              rules={[{ required: true, message: "请输入显示排序" }]}
            >
              <InputNumber placeholder="请输入显示排序" className="!w-full" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="回显样式" name="listClass">
              <Select placeholder="请选择回显样式" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="状态" name="status">
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

export default UpdateDataDrawer;
