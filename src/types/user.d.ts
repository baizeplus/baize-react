interface IUserProfile {
  userName: string;
  email: string;
  avatar: string;
  deptName: string;
  remark: string;
  phonenumber: string
  createTime: number;
}

interface IUpdateUserBaseInfo {
  email: string;
  nickName: string;
  phonenumber: string;
  sex: string;
}

interface IUserSearchParams {
  userName?: string,
  phonenumber?: string,
  status?: string,
  dataScope?: string,
}

interface IUserItem {
  userId: string,
  userName: string,
  nickName: string,
  sex: string,
  status: string,
  delFlag: string,
  deptId: string,
  deptName: string,
  leader: string,
  email: string,
  phonenumber: string,
  avatar: string,
  dataScope: string,
  roleId?: string,
  remark: string,
  createBy: number,
  createTime: number,
  updateBy: number,
  updateTime?: number
}

