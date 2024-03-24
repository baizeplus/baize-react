import { FC, useEffect, useState } from "react";
import { App, Switch } from "antd";

type ITableItemSwitchProps = {
  name: string;
  idLabel: string;
  id: string;
  status: string;
  tipTag?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changeStatusFn: (params: Record<string, string>) => Promise<unknown>;
};

const TableItemSwitch: FC<ITableItemSwitchProps> = ({
  name,
  idLabel,
  id,
  status,
  tipTag,
  changeStatusFn,
}) => {
  const { message, modal } = App.useApp();
  const [value, setValue] = useState(false);

  useEffect(() => {
    setValue(status === "0");
  }, [status]);

  const handleChangeStatus = async () => {
    setValue((f) => !f);
    modal.confirm({
      title: value ? `停用${tipTag}` : `启用${tipTag}`,
      content: value
        ? `确认停用"${name}"${tipTag}吗？`
        : `确认启用"${name}"${tipTag}吗？`,
      onOk: async () => {
        try {
          await changeStatusFn({ [idLabel]: id, status: value ? "1" : "0" });
          message.success(value ? `停用${tipTag}成功` : `启用${tipTag}成功`);
        } catch {
          setValue((f) => !f);
        }
      },
      onCancel: () => setValue((f) => !f),
    });
  };

  return <Switch value={value} onChange={handleChangeStatus} />;
};

export default TableItemSwitch;
