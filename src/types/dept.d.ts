interface IDeptItem {
  deptId: string;
  deptName: string;
  ancestors: string;
  delFag: string;
  email: string;
  leader: string;
  orderNum: number;
  parentId: string;
  phone: string;
  status: string;
  updateBy: number;
  createBy: number;
  createTime: number;
  updateTime?: number;
  children?: IDeptItem[];
}