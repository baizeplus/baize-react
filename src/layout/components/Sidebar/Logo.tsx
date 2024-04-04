import { Flex, Typography } from "antd";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import LogoImg from "@/assets/images/logo.png";

type LogoProps = {
  collapsed: boolean;
};

const Logo: FC<LogoProps> = ({ collapsed }) => {
  return (
    <div className="text-center pt-5 pb-2">
      <NavLink to="/index/">
        <Typography.Title ellipsis level={5} className="!text-white">
          <Flex justify="center" align="center">
            <img src={LogoImg} alt="白泽logo" className="w-[32px] mr-2" />
            {!collapsed && <span>白泽管理系统</span>}
          </Flex>
        </Typography.Title>{" "}
      </NavLink>
    </div>
  );
};

export default Logo;
