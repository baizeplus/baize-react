interface IPostItem {
  postId: string;
  postSort: number;
  postCode: string;
  postName: string;
  status: string;
  remark?: string;
  createBy: number;
  createTime: number;
  updateBy: number;
  updateTime?: number;
}