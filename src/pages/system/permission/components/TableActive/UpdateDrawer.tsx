import { FC, useCallback, useState } from "react";
import {
  App,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  TreeDataNode,
  TreeSelect,
} from "antd";

import QueryTable from "@/components/QueryTable";
import { handleTree } from "@/utils/baize";
import { DrawerWarpper } from "@/components";
import {
  addPermission,
  getPermission,
  updatePermission,
} from "@/api/system/permission";
import useDict from "@/hooks/useDict";
import { selectBoxPermission } from "@/api/system/selectBox";

type IUpdateDrawerProps = {
  children: React.ReactNode;
  id?: React.Key;
  parentId?: string;
};

/** 新增/更新Menu数据Drawer */
const UpdateDrawer: FC<IUpdateDrawerProps> = ({
  children,
  id = "",
  parentId = "",
}) => {
  const { message } = App.useApp();
  const { queryFn } = QueryTable.useQueryTable();
  const [sys_normal_disable] = useDict(["sys_normal_disable"]);
  const [form] = Form.useForm();
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);

  /** 请求当前Menu数据 */
  const getCurrMenu = useCallback(async () => {
    const { data } = await getPermission(id);
    form.setFieldsValue({
      status: "0",
      visible: "0",
      ...data,
      // menu: { menuCheckStrictly: Boolean(data.menuCheckStrictly) },
    });
  }, [form, id]);

  /** 请求当前Tree数据 */
  const getCurrMenuTree = useCallback(async () => {
    const { data } = await selectBoxPermission();
    const list: TreeDataNode[] = handleTree(data, "permissionId", "parentId");
    const permissionData = [
      { permissionId: "0", permissionName: "主类目", children: list },
    ];
    setTreeData(permissionData as unknown as TreeDataNode[]);
  }, []);

  /** 执行请求menu及tree数据 */
  const handleMount = () => {
    form.resetFields();
    getCurrMenuTree();
    if (parentId) {
      form.setFieldValue("parentId", parentId);
    }
    if (id) {
      getCurrMenu();
    } else {
      form.setFieldsValue({
        menuType: "M",
        status: "0",
        isFrame: "1",
        visible: "0",
      });
    }
  };

  /** 提交按钮 */
  const handleSubmit = async () => {
    const values = await form.validateFields();
    const params = {
      ...values,
    };
    id ? await updatePermission(params) : await addPermission(params);
    /** 提交成功后重新请求表格数据 */
    queryFn?.();
    message.success(`${id ? "修改" : "新增"}成功`);
  };

  return (
    <DrawerWarpper
      width={520}
      title={id ? "修改权限" : "添加权限"}
      iconBtn={children}
      onMount={handleMount}
      onSubmit={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item hidden label="菜单Id" name="menuId">
          <Input />
        </Form.Item>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label="上级权限"
              name="parentId"
              rules={[{ required: true, message: "请选择上级权限" }]}
            >
              <TreeSelect
                treeData={treeData}
                fieldNames={{ label: "permissionName", value: "permissionId" }}
                placeholder="请选择上级权限"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="权限名称"
              name="permissionName"
              rules={[{ required: true, message: "请输入权限名称" }]}
            >
              <Input placeholder="请输入权限名称" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="显示排序"
              name="sort"
              rules={[{ required: true, message: "请输入显示排序" }]}
            >
              <InputNumber placeholder="请输入显示排序" className="!w-full" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="权限字符"
              name="permission"
              rules={[{ required: true, message: "请输入权限字符" }]}
              tooltip="控制器中定义的权限字符，如：'system:user:list'"
            >
              <Input placeholder="请输入权限字符" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="权限状态"
              name="status"
              tooltip="选择停用则路由将不会出现在侧边栏，也不能被访问"
            >
              <Radio.Group options={sys_normal_disable} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DrawerWarpper>
  );
};

export default UpdateDrawer;
