interface IRoleItem {
  roleId: string;
  roleSort: number;
  roleKey: string;
  roleName: string;
  delFlag: string,
  status: string;
  remark?: string;
  createBy: number;
  createTime: number;
  updateBy: number;
  updateTime?: number;
}