interface IUserProfile {
  userName: string;
  nickName: string;
  email: string;
  avatar: string;
  deptName: string;
  remark: string;
  phonenumber: string;
  createTime: number;
}

interface IUpdateUserBaseInfo {
  email: string;
  nickName: string;
  phonenumber: string;
  sex: string;
}

interface IUserSearchParams<> {
  userName?: string;
  phonenumber?: string;
  status?: string;
  dataScope?: Dayjs[];
}

interface IUserItem {
  userId: string;
  userName: string;
  nickName: string;
  sex: string;
  status: string;
  delFlag: string;
  deptId: string;
  deptName: string;
  leader: string;
  email: string;
  phonenumber: string;
  avatar: string;
  dataScope: string;
  roleId?: string;
  remark: string;
  createBy: number;
  createTime: number;
  updateBy: number;
  updateTime?: number;
}

interface IEditUserParams {
  nickName: string;
  userId?: string;
  deptId?: string;
  phonenumber?: string;
  email?: string;
  userName?: string;
  password?: string;
  sex?: string;
  status: string;
  postIds?: string[];
  roleIds?: string[];
  remark?: string;
}
