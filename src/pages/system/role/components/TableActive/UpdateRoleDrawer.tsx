import { FC, useCallback, useState } from "react";
import {
  App,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Space,
  TreeDataNode,
} from "antd";

// import {
//   getRoleMenuTreeSelect,
// } from "@/api/system/permission";
import { addRole, getRole, updateRole } from "@/api/system/role";
import QueryTable from "@/components/QueryTable";
import TreeForm from "@/components/TreeForm/TreeForm";
import { handleTree } from "@/utils/baize";
import { DrawerWarpper } from "@/components";
import useDict from "@/hooks/useDict";
import { selectBoxPermission } from "@/api/system/selectBox";

type IUpdateRoleDrawerProps = {
  children: React.ReactNode;
  id?: React.Key;
};

/** 新增/更新Role数据Drawer */
const UpdateRoleDrawer: FC<IUpdateRoleDrawerProps> = ({
  children,
  id = "",
}) => {
  const { message } = App.useApp();
  const { queryFn } = QueryTable.useQueryTable();
  const [form] = Form.useForm();
  const [sys_normal_disable] = useDict(["sys_normal_disable"]);
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);

  /** 请求当前Role数据 */
  const getCurrRole = useCallback(async () => {
    const { data } = await getRole(id);
    form.setFieldsValue({
      ...data,
      permission: {
        permissionCheckStrictly: Boolean(data.permissionCheckStrictly),
        permissionIds: data.permissionIds || [],
      },
    });
  }, [form, id]);

  /** 请求当前Role Tree数据 */
  const getCurrRolePermissionTree = useCallback(async () => {
    const { data } = await selectBoxPermission();
    const list: TreeDataNode[] = handleTree(data, "permissionId", "parentId");
    setTreeData(list);
  }, []);

  /** 执行请求Role及tree数据 */
  const handleMount = () => {
    form.resetFields();
    if (id) {
      getCurrRole();
    } else {
      form.setFieldValue("status", "0");
    }
    getCurrRolePermissionTree();
  };

  /** 提交按钮 */
  const handleSubmit = async () => {
    const values = await form.validateFields();
    const {
      permission: { permissionCheckStrictly, permissionIds },
    } = values;
    delete values.permission;
    const params = {
      ...values,
      permissionCheckStrictly,
      permissionIds,
    };
    id ? await updateRole(params) : await addRole(params);
    /** 提交成功后重新请求表格数据 */
    queryFn?.();
    message.success(`${id ? "修改" : "新增"}成功`);
  };

  return (
    <DrawerWarpper
      title={id ? "修改角色" : "添加角色"}
      iconBtn={children}
      onMount={handleMount}
      onSubmit={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item hidden label="角色Id" name="roleId">
          <Input />
        </Form.Item>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item
              label="角色名称"
              name="roleName"
              rules={[{ required: true, message: "请输入角色名称" }]}
            >
              <Input placeholder="请输入角色名称" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="角色顺序"
              name="roleSort"
              rules={[{ required: true, message: "请输入角色顺序" }]}
            >
              <InputNumber placeholder="请输入角色顺序" className="!w-full" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="状态" name="status">
              <Radio.Group options={sys_normal_disable} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="菜单权限">
              <Space.Compact direction="vertical" className="w-full">
                <Form.Item
                  name={["permission", "permissionCheckStrictly"]}
                  valuePropName="checked"
                  noStyle
                >
                  <Checkbox>父子联动</Checkbox>
                </Form.Item>
                <Form.Item name={["permission", "permissionIds"]} noStyle>
                  <TreeForm
                    defaultExpandParent
                    treeData={treeData}
                    className="border rounded-md !mt-2 !p-1 !w-full"
                    fieldNames={{
                      title: "permissionName",
                      key: "permissionId",
                    }}
                  />
                </Form.Item>
              </Space.Compact>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="备注" name="remark">
          <Input.TextArea placeholder="备注" />
        </Form.Item>
      </Form>
    </DrawerWarpper>
  );
};

export default UpdateRoleDrawer;
