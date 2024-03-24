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

import { getRoleMenuTreeSelect, getTreeSelect } from "@/api/system/menu";
import { addRole, getRole, updateRole } from "@/api/system/role";
import QueryTable from "@/components/QueryTable";
import TreeForm from "@/components/TreeForm/TreeForm";
import { handleTree } from "@/utils/baize";
import { DrawerWarpper } from "@/components";

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
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);

  /** 请求当前Role数据 */
  const getCurrRole = useCallback(async () => {
    const { data } = await getRole(id);
    form.setFieldsValue({
      ...data,
      menu: { menuCheckStrictly: Boolean(data.menuCheckStrictly) },
    });
  }, [form, id]);

  /** 请求当前Role Tree数据 */
  const getCurrRoleMenuTree = useCallback(async () => {
    const { data } = id
      ? await getRoleMenuTreeSelect(id)
      : await getTreeSelect();
    const list: TreeDataNode[] = handleTree(
      data.menus || data,
      "menuId",
      "parentId",
    );
    setTreeData(list);
    form.setFieldValue("menu", { menuIds: data.checkedKeys });
  }, [form, id]);

  /** 执行请求Role及tree数据 */
  const handleMount = () => {
    form.resetFields();
    if (id) {
      getCurrRole();
    } else {
      form.setFieldValue("status", "0");
    }
    getCurrRoleMenuTree();
  };

  /** 提交按钮 */
  const handleSubmit = async () => {
    const values = await form.validateFields();
    const {
      menu: { menuCheckStrictly, menuIds },
    } = values;
    delete values.menu;
    const params = {
      ...values,
      menuCheckStrictly,
      menuIds,
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
          <Col span={24}>
            <Form.Item
              label="权限字符"
              name="roleKey"
              rules={[{ required: true, message: "请输入权限字符" }]}
              tooltip="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)"
            >
              <Input placeholder="请输入权限字符" />
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
              <Radio.Group>
                <Radio value="0">正常</Radio>
                <Radio value="1">停用</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="菜单权限">
              <Space.Compact direction="vertical" className="w-full">
                <Form.Item
                  name={["menu", "menuCheckStrictly"]}
                  valuePropName="checked"
                  noStyle
                >
                  <Checkbox>父子联动</Checkbox>
                </Form.Item>
                <Form.Item name={["menu", "menuIds"]} noStyle>
                  <TreeForm
                    defaultExpandParent
                    treeData={treeData}
                    className="border rounded-md !mt-2 !p-1 !w-full"
                    fieldNames={{ title: "menuName", key: "menuId" }}
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
