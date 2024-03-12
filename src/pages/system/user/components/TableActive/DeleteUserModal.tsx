import { ForwardedRef, ReactNode, forwardRef, useImperativeHandle } from "react";
import { App, message } from "antd";
import { delUser } from "@/api/system/user";

type IDeleteUserModalProps = {
  id?: IUserItem['userId'];
  children?: ReactNode;
  onSuccess?: () => void;
};

export type IDeleteUserRefProps = {
  deleteUser: (ids: string) => Promise<void>
}

const DeleteUserModal = forwardRef(({ children, id = '', onSuccess }:IDeleteUserModalProps, ref: ForwardedRef<IDeleteUserRefProps>) => {
  const { modal } = App.useApp();

  const handleDeleteUser = async (ids?: string) => {
    modal.confirm({
      title: '系统提示',
      content: <span>是否确认删除编号:「<strong>{ids || id}</strong>」的用户？</span>,
      onOk: async () => {
        await delUser(ids || id);
        message.success('删除成功');
        onSuccess?.();
      },
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
    })
  }

  useImperativeHandle(ref, () => ({
    deleteUser: (ids: string) => handleDeleteUser(ids),
  }))

  return (
    <div onClick={() => ref ? null : handleDeleteUser()}>{children || '删除'}</div>
  );
});

export default DeleteUserModal;