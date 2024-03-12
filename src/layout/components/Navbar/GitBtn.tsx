import { FC } from "react";
import { GithubOutlined } from "@ant-design/icons"
import { Tooltip } from "antd";

const GitBtn:FC = () => {
  const gitUrl = 'https://gitee.com/baizeplus/baize'
  return (
    <Tooltip placement="top" title={"源码地址"}>
      <GithubOutlined className="text-[20px] mr-3" onClick={() => open(gitUrl)}/>
    </Tooltip>
  ) 
};

export default GitBtn;