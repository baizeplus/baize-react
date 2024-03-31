import { FC } from "react";
import { App } from "antd";

type IDeleteConfirmProps = {
  children: React.ReactNode;
  id?: string;
  ids?: string;
  text?: string;
  successText?: string;
  tipTag?: string;
  delFn: (ids: string) => Promise<unknown>;
  onSuccess?: () => void;
};

/** 删除确认提示框 */
const DeleteConfirm: FC<IDeleteConfirmProps> = ({
  children,
  id = "",
  ids,
  tipTag,
  text,
  successText,
  delFn,
  onSuccess,
}) => {
  const { modal, message } = App.useApp();

  const handleDeleteUser = async () => {
    modal.confirm({
      title: "系统提示",
      content: (
        <span>
          {text ? (
            text
          ) : (
            <>
              是否确认删除编号:「<strong>{ids || id}</strong>」的{tipTag}数据？
            </>
          )}
        </span>
      ),
      onOk: async () => {
        await delFn(ids || id);
        message.success(successText || "删除成功");
        onSuccess?.();
      },
      okText: "删除",
      okType: "danger",
      cancelText: "取消",
    });
  };

  return <div onClick={handleDeleteUser}>{children || "删除"}</div>;
};

export default DeleteConfirm;
