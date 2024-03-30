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
import { addDept, getDept, updateDept, getDeptList } from "@/api/system/dept";

type IUpdateDeptDrawerProps = {
  children: React.ReactNode;
  id?: React.Key;
  parentId?: string;
};

/** 新增/更新Dept数据Drawer */
const UpdateDeptDrawer: FC<IUpdateDeptDrawerProps> = ({
  children,
  id = "",
  parentId = "",
}) => {
  const { message } = App.useApp();
  const { queryFn } = QueryTable.useQueryTable();
  const [form] = Form.useForm();
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);

  /** 请求当前Dept数据 */
  const getCurrMenu = useCallback(async () => {
    const { data } = await getDept(id);
    form.setFieldsValue({
      status: "0",
      ...data,
    });
  }, [form, id]);

  /** 请求当前Tree数据 */
  const getCurrMenuTree = useCallback(async () => {
    const { data } = await getDeptList();
    const list: TreeDataNode[] = handleTree(data, "deptId", "parentId");
    setTreeData(list);
  }, []);

  /** 执行请求dept及tree数据 */
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
    id ? await updateDept(params) : await addDept(params);
    /** 提交成功后重新请求表格数据 */
    queryFn?.();
    message.success(`${id ? "修改" : "新增"}成功`);
  };

  return (
    <DrawerWarpper
      width={520}
      title={id ? "修改部门" : "添加部门"}
      iconBtn={children}
      onMount={handleMount}
      onSubmit={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item hidden label="部门Id" name="deptId">
          <Input />
        </Form.Item>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label="上级部门"
              name="parentId"
              rules={[{ required: true, message: "请选择上级菜单" }]}
            >
              <TreeSelect
                treeData={treeData}
                fieldNames={{ label: "deptName", value: "deptId" }}
                placeholder="请选择上级部门"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="部门名称"
              name="deptName"
              rules={[{ required: true, message: "请输入部门名称" }]}
            >
              <Input placeholder="请输入部门名称" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="显示排序"
              name="orderNum"
              rules={[{ required: true, message: "请输入显示排序" }]}
            >
              <InputNumber placeholder="请输入显示排序" className="!w-full" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="负责人"
              name="leader"
              rules={[{ required: true, message: "请输入负责人" }]}
            >
              <Input placeholder="请输入负责人" className="!w-full" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="联系电话"
              name="phone"
              rules={[{ required: true, message: "请输入联系电话" }]}
            >
              <Input placeholder="请输入联系电话" className="!w-full" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[{ required: true, message: "请输入邮箱" }]}
            >
              <Input placeholder="请输入邮箱" className="!w-full" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="部门状态" name="status">
              <Radio.Group>
                <Radio value="0">正常</Radio>
                <Radio value="1">停用</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DrawerWarpper>
  );
};

export default UpdateDeptDrawer;
