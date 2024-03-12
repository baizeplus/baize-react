import { FC, useEffect, useState } from "react";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";

const ScreenfullBtn: FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  useEffect(() => { 
    // 监听浏览器是否全屏变化
    document.addEventListener("fullscreenchange", () => {
      setIsFullscreen(!!document.fullscreenElement)
    });

    return () => {
      document.removeEventListener("fullscreenchange", () => {
        setIsFullscreen(!!document.fullscreenElement)
      });
    }
  }, [])

  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
     isFullscreen ? <FullscreenExitOutlined className="text-[20px] mr-3" onClick={handleFullscreen}/> : <FullscreenOutlined className="text-[20px] mr-3" onClick={handleFullscreen}/>
  );
};

export default ScreenfullBtn;
