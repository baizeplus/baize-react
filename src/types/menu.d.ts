interface IMenuItem {
  menuId: string;
  menuName: string;
  parentName: string;
  parentId: number;
  orderNum: number;
  path: string;
  component: string;
  isFrame: string;
  isCache: string;
  menuType: string;
  visible: string;
  status: string;
  perms: string;
  icon: string;
  remark: string;
  Children: IMenuItem[];
  createTime?: number;
  updateTime?: null;
}
