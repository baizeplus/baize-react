import { FC } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons"
import { Tooltip } from "antd";

const DocBtn:FC = () => {
  const docUrl = 'https://gitee.com/baizeplus/baize'
  return (
    <Tooltip placement="top" title={"文档地址"}>
      <QuestionCircleOutlined className="text-[20px] mr-3" onClick={() => open(docUrl)}/>
    </Tooltip>
  ) 
};

export default DocBtn;