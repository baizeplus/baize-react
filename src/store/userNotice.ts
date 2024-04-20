import { create } from "zustand";

type UserNoticeStoreProps = {
  noticeType: "" | "1" | "2";
  status: "" | "1" | "2";
  dot: boolean;
  selectedRowKeys: React.Key[];
  noticeData?: INoticeItem;
};

const UserNoticeStore = create<UserNoticeStoreProps>(() => ({
  noticeType: "",
  status: "",
  dot: false,
  selectedRowKeys: [],
}));

export const setDot = (dot: UserNoticeStoreProps["dot"]) =>
  UserNoticeStore.setState({ dot });

export const setNoticeType = (noticeType: UserNoticeStoreProps["noticeType"]) =>
  UserNoticeStore.setState({ noticeType });
export const setStatus = (status: UserNoticeStoreProps["status"]) =>
  UserNoticeStore.setState({ status });
export const setSelectedRowKeys = (
  selectedRowKeys: UserNoticeStoreProps["selectedRowKeys"],
) => UserNoticeStore.setState({ selectedRowKeys });
export const setNoticeData = (noticeData: UserNoticeStoreProps["noticeData"]) =>
  UserNoticeStore.setState({ noticeData });

export default UserNoticeStore;
