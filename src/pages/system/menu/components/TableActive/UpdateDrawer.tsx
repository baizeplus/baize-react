import { FC, useCallback, useState } from "react";
import {
  App,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  TreeDataNode,
  TreeSelect,
} from "antd";

import QueryTable from "@/components/QueryTable";
import { handleTree } from "@/utils/baize";
import { DrawerWarpper } from "@/components";
import { addMenu, getMenu, getTreeSelect, updateMenu } from "@/api/system/menu";
import useDict from "@/hooks/useDict";

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
  const [sys_show_hide, sys_normal_disable] = useDict([
    "sys_show_hide",
    "sys_normal_disable",
  ]);
  const [form] = Form.useForm();
  const menuType = Form.useWatch("menuType", form);
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);

  /** 请求当前Menu数据 */
  const getCurrMenu = useCallback(async () => {
    const { data } = await getMenu(id);
    form.setFieldsValue({
      status: "0",
      visible: "0",
      ...data,
      // menu: { menuCheckStrictly: Boolean(data.menuCheckStrictly) },
    });
  }, [form, id]);

  /** 请求当前Tree数据 */
  const getCurrMenuTree = useCallback(async () => {
    const { data } = await getTreeSelect();
    const list: TreeDataNode[] = handleTree(data, "menuId", "parentId");
    const menu = [{ menuId: "0", menuName: "主类目", children: list }];
    setTreeData(menu as any);
    form.setFieldValue("menu", { menuIds: data.checkedKeys });
  }, [form]);

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
    id ? await updateMenu(params) : await addMenu(params);
    /** 提交成功后重新请求表格数据 */
    queryFn?.();
    message.success(`${id ? "修改" : "新增"}成功`);
  };

  return (
    <DrawerWarpper
      width={520}
      title={id ? "修改菜单" : "添加菜单"}
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
              label="上级菜单"
              name="parentId"
              rules={[{ required: true, message: "请选择上级菜单" }]}
            >
              <TreeSelect
                treeData={treeData}
                fieldNames={{ label: "menuName", value: "menuId" }}
                placeholder="请选择上级菜单"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="菜单名称"
              name="menuName"
              rules={[{ required: true, message: "请输入菜单名称" }]}
            >
              <Input placeholder="请输入菜单名称" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="菜单类型"
              name="menuType"
              rules={[{ required: true, message: "请选择菜单类型" }]}
            >
              <Radio.Group>
                <Radio value="M">目录</Radio>
                <Radio value="C">菜单</Radio>
                <Radio value="F">按钮</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          {menuType !== "F" && (
            <Col span={12}>
              <Form.Item
                label="是否外链"
                name="isFrame"
                rules={[{ required: true, message: "请选择是否外链" }]}
                tooltip="选择是外链则路由地址需要以`http(s)://`开头"
              >
                <Radio.Group>
                  <Radio value="0">是</Radio>
                  <Radio value="1">否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          )}

          {menuType !== "F" && (
            <Col span={12}>
              <Form.Item
                label="菜单图标"
                name="icon"
                rules={[{ required: true, message: "请输入菜单图标" }]}
              >
                <Select placeholder="请选择菜单图标" className="!w-full" />
              </Form.Item>
            </Col>
          )}

          <Col span={12}>
            <Form.Item
              label="显示排序"
              name="orderNum"
              rules={[{ required: true, message: "请输入显示排序" }]}
            >
              <InputNumber placeholder="请输入显示排序" className="!w-full" />
            </Form.Item>
          </Col>

          {menuType !== "F" && (
            <Col span={12}>
              <Form.Item
                label="路由地址"
                name="path"
                rules={[{ required: true, message: "请输入路由地址" }]}
                tooltip="访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头"
              >
                <Input placeholder="请输入路由地址" />
              </Form.Item>
            </Col>
          )}

          {menuType === "C" && (
            <Col span={12}>
              <Form.Item
                label="组件路径"
                name="component"
                rules={[{ required: true, message: "请输入组件路径" }]}
                tooltip="访问的组件路径，如：`system/user/index`，默认在`views`目录下"
              >
                <Input placeholder="请输入组件路径" />
              </Form.Item>
            </Col>
          )}

          {menuType !== "M" && (
            <Col span={12}>
              <Form.Item
                label="权限标识"
                name="perms"
                rules={[{ required: true, message: "请输入权限标识" }]}
                tooltip="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)"
              >
                <Input placeholder="请输入权限标识" />
              </Form.Item>
            </Col>
          )}

          {menuType === "C" && (
            <Col span={12}>
              <Form.Item
                label="路由参数"
                name="query"
                rules={[{ required: true, message: "请输入路由参数" }]}
                tooltip="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)"
              >
                <Input placeholder="请输入路由参数" />
              </Form.Item>
            </Col>
          )}
          {menuType === "C" && (
            <Col span={12}>
              <Form.Item
                label="是否缓存"
                name="isCache"
                tooltip="选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致"
              >
                <Radio.Group>
                  <Radio value="0">缓存</Radio>
                  <Radio value="1">不缓存</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          )}

          {menuType !== "F" && (
            <Col span={12}>
              <Form.Item
                label="显示状态"
                name="visible"
                tooltip="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问"
              >
                <Radio.Group options={sys_show_hide} />
              </Form.Item>
            </Col>
          )}

          <Col span={12}>
            <Form.Item
              label="菜单状态"
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
