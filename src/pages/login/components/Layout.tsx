import { FC } from "react";

type IProps = {
  children: JSX.Element;
};

const Layout: FC<IProps> = ({ children }) => {
  return (
    <div
      className="flex h-screen items-center justify-center min-w-[390px]"
      style={{
        background:
          "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(214,214,225,1) 80%)",
      }}
    >
      {children}
      <div className="absolute bottom-2 min-w-[390px] text-center">
        <span className="text-xs text-white">Copyright © 2018-2024 ruoyi.vip All Rights Reserved.</span>
      </div>
    </div>
  );
};

export default Layout;
