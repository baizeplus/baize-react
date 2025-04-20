import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { App, Col, Form, Input, Modal, Row, Select, Spin } from "antd";
import { selectUserDataScope, updateUserDataScope } from "@/api/system/user";
import { handleTree } from "@/utils/baize";
import { selectBoxDept } from "@/api/system/selectBox";
import TreeForm from "@/components/TreeForm/TreeForm";
import { DataNode } from "antd/es/tree";

type IUpdateUserDataScopeModalProps = {
  id?: IUserItem["userId"];
  userName?: IUserItem["userName"];
  children?: ReactNode;
  onSuccess?: () => void;
};

const UpdateUserDataScopeModal: FC<IUpdateUserDataScopeModalProps> = ({
  children,
  id = "",
  userName = "",
  onSuccess,
}) => {
  const { message } = App.useApp();
  const [open, setOpen] = useState(false);
  const [deptOptions, setDeptOptions] = useState<DataNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const dataScope = Form.useWatch(["dataScope"], form);

  const dataScopeOptions = [
    { value: "1", label: "全部数据权限" },
    { value: "2", label: "自定数据权限" },
    { value: "3", label: "本部门数据权限" },
    { value: "4", label: "本部门及以下数据权限" },
    { value: "5", label: "无数据权限" },
  ];

  const getCurrUser = useCallback(async () => {
    try {
      const { data } = await selectUserDataScope(id);
      form.setFieldsValue({
        ...data,
        userName: userName,
      });
    } finally {
      setLoading(false);
    }
  }, [form, id, userName]);

  const getDeptOptions = async () => {
    const { data } = await selectBoxDept();
    // const dateNodeList = data.map((item: IDeptItem) => ({ title: item.deptName, key: item.deptId, parentId: item.parentId}))
    setDeptOptions(handleTree(data, "deptId", "parentId"));
  };

  useEffect(() => {
    if (open) {
      form.resetFields();
      getCurrUser();
      getDeptOptions();
    }
  }, [form, getCurrUser, open]);

  const handleFinish = async () => {
    const values = await form.validateFields();
    setConfirmLoading(true);
    const params = {
      userId: values.userId,
      dataScope: values.dataScope,
      deptIds: Array.isArray(values.deptIds)
        ? values.deptIds
        : values.deptIds.checked,
    };
    try {
      await updateUserDataScope(params);
      setOpen(false);
      message.success(id ? "更新成功" : "添加成功");
      onSuccess?.();
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children || "点击"}</div>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="分配数据权限"
        onOk={handleFinish}
        confirmLoading={confirmLoading}
        okText="确定"
        cancelText="取消"
      >
        <Spin spinning={loading}>
          <Form form={form} layout="vertical">
            <Form.Item hidden label="用户Id" name="userId">
              <Input />
            </Form.Item>
            <Row gutter={12}>
              <Col span={24}>
                <Form.Item
                  label="用户昵称"
                  name="userName"
                  rules={[{ required: true, message: "请输入用户昵称" }]}
                >
                  <Input placeholder="请输入用户昵称" disabled />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="权限范围"
                  name="dataScope"
                  rules={[{ required: true, message: "请选择权限范围" }]}
                >
                  <Select options={dataScopeOptions} />
                </Form.Item>
              </Col>
              {dataScope === "2" && (
                <Col span={24}>
                  <Form.Item label="数据权限" name="deptIds">
                    <TreeForm
                      checkStrictly
                      defaultExpandAll
                      defaultExpandedKeys={form.getFieldValue("deptIds")}
                      treeData={deptOptions}
                      className="border rounded-md !mt-2 !p-1 !w-full"
                      fieldNames={{
                        title: "deptName",
                        key: "deptId",
                      }}
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};

export default UpdateUserDataScopeModal;
