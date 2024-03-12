import { FC, useEffect, useState } from "react";
import { App, Switch } from "antd";
import { changeUserStatus } from "@/api/system/user";

type ITableItemSwitchProps = {
  userId: IUserItem["userId"]
  status: IUserItem["status"]
}

const TableItemSwitch:FC<ITableItemSwitchProps> = ({ userId, status }) => {
  const { message, modal } = App.useApp();
  const [value, setValue] = useState(false);

  useEffect(() => {
    setValue(status === '0');
  }, [status]);

  const handleChangeStatus = async () => {
    setValue(f => !f);
    modal.confirm({
      title: value ? '停用用户' : '启用用户',
      content: value ? '确认停用该用户吗？' : '确认启用该用户吗？',
      onOk: async () => {
        try {
          await changeUserStatus({ userId, status: value ? '1' : '0' });
          message.success(value ? '停用用户成功' : '启用用户成功');
        } catch {
          setValue(f => !f);
        }
      },
      onCancel: () => setValue(f => !f)
    });
   
  };

  return (
    <Switch value={value} onChange={handleChangeStatus}/>
  )
};

export default TableItemSwitch;