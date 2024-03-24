interface IRoleItem {
  roleId: string;
  roleSort: number;
  roleKey: string;
  roleName: string;
  delFlag: string;
  status: string;
  remark?: string;
  createBy: number;
  createTime: number;
  updateBy: number;
  updateTime?: number;
}

interface IRoleQueryParams {
  roleName?: string;
  roleKey?: string;
  status?: string;
  beginTime?: string;
  endTime?: string;
}

interface IEditRoleParams {
  roleName: string;
  roleKey: string;
  roleSort: number;
  status: string;
  remark: string;
  menuCheckStrictly: boolean;
  menuIds: string[];
}
