import { Button } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";

const Page404: FC = () => {
  return (
    <div className="w-[300px]">
      <h1 className="text-3xl font-semibold text-primary mb-4">404错误!</h1>
      <h1 className="text-xl mb-2">找不到网页!</h1>
      <h2 className="text-xs text-[#707070] mb-5"> 对不起，您正在寻找的页面不存在。尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容</h2>
      <Button type="primary" shape="round"><Link to="/index">返回首页</Link></Button>
    </div>
  );
};

export default Page404;