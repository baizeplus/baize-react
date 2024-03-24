import { FC, useEffect, useState } from "react";
import { Button, Drawer, Space, Spin } from "antd";

type IDrawerWarpperProps = {
  children: React.ReactNode;
  title?: string;
  iconBtn?: React.ReactNode;
  /**
   * onMount方法是打开Drawer后的后调
   * @ 建议使用useCallback包裹后再传入
   *
   */
  onMount?: () => void;
  onSubmit?: () => Promise<unknown>;
};

const DrawerWarpper: FC<IDrawerWarpperProps> = ({
  children,
  iconBtn,
  title,
  onMount,
  onSubmit,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      onMount?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSubmit?.();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{iconBtn || "点击"}</div>
      <Drawer
        open={open}
        width={390}
        title={title}
        onClose={handleClose}
        classNames={{
          body: "!p-4",
        }}
        extra={
          <Space size="middle">
            <Button onClick={handleClose}>取消</Button>
            <Button onClick={handleSubmit} type="primary" loading={loading}>
              提交
            </Button>
          </Space>
        }
      >
        <Spin spinning={loading}>{children}</Spin>
      </Drawer>
    </>
  );
};

export default DrawerWarpper;
