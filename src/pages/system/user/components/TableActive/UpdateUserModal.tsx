import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { App, Col, Form, Input, Modal, Radio, Row, Select, Spin, TreeSelect } from "antd";
import { addUser, getUser, updateUser } from "@/api/system/user";
import { getDeptList } from "@/api/system/dept";
import { handleTree } from "@/utils/baize";

type IUpdateUserModalProps = {
  id?: IUserItem['userId'];
  children?: ReactNode;
  onSuccess?: () => void;
};

const UpdateUserModal: FC<IUpdateUserModalProps> = ({ children, id = '', onSuccess }) => {
  const { message } = App.useApp();
  const [open, setOpen] = useState(false);
  const [postsOptions, setPostsOptions] = useState<IPostItem[]>([]);
  const [roleOptions, setRoleOptions] = useState<IRoleItem[]>([]);
  const [deptOptions, setDeptOptions] = useState<IDeptItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const getCurrUser = useCallback(async () => {
    try {
      const { data } = await getUser(id);
      setPostsOptions(data.posts);
      setRoleOptions(data.roles);
      form.setFieldsValue({
        status: "0",
        ...data.user,
        postIds: data.postIds,
        roleIds: data.roleIds,
      });
    } finally {
      setLoading(false);
    }
  }, [form, id]);

  const getDeptOptions = async () => {
    const { data } = await getDeptList();
    // const dateNodeList = data.map((item: IDeptItem) => ({ title: item.deptName, key: item.deptId, parentId: item.parentId}))
    setDeptOptions(handleTree(data, 'deptId', 'parentId'))
  }

  useEffect(() => {
    if(open) {
      form.resetFields();
      getCurrUser();
      getDeptOptions();
    }
  }, [form, getCurrUser, open]);

  const handleFinish = async () => {
   const values = await form.validateFields();
   setConfirmLoading(true);
    try {
      id ? await updateUser(values) : await addUser(values);
      setOpen(false);
      message.success(id ? '更新成功' : '添加成功');
      onSuccess?.();
    } finally {
      setConfirmLoading(false);
    }
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>{children || "点击"}</div>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title={id ? "修改用户" : "添加用户"}
        onOk={handleFinish}
        confirmLoading={confirmLoading}
        okText="确定"
        cancelText="取消"
      >
        <Spin spinning={loading}>
          <Form form={form} layout="vertical">
            <Form.Item hidden label="用户昵称" name="userId">
              <Input />
            </Form.Item>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="用户昵称" name="nickName" rules={[{ required: true, message: '请输入用户昵称' }]}>
                  <Input placeholder="请输入用户昵称" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="归属部门" name="deptId">
                  <TreeSelect 
                    treeDefaultExpandAll
                    fieldNames={{label: 'deptName', value: 'deptId' }}
                    treeData={deptOptions}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="手机号码" name="phonenumber" rules={[{ pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码" }]}>
                  <Input placeholder="手机号码" maxLength={11}/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="邮箱" name="email" rules={[{ type: 'email', message: '请输入正确邮箱' }]}>
                  <Input placeholder="邮箱" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="用户名称" name="userName">
                  <Input placeholder="用户名称" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="用户密码" name="password">
                  <Input placeholder="用户密码" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="性别" name="sex">
                  <Select 
                    options={[
                      { label: '男', value: '0' },
                      { label: '女', value: '1' },
                      { label: '未知', value: '2' },
                    ]}
                  />
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

              <Col span={12}>
                <Form.Item label="岗位" name="postIds">
                  <Select 
                    mode="multiple"
                    options={postsOptions.map(item => ({ label: item.postName, value: item.postId, disabled: item.status === "1" }))}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="角色" name="roleIds">
                  <Select 
                    mode="multiple"
                    options={roleOptions.map(item => ({ label: item.roleName, value: item.roleId, disabled: item.status === "1" }))}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="备注" name="remark">
              <Input.TextArea placeholder="备注" />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};

export default UpdateUserModal;
