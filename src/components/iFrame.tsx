import { FC } from "react";
import { useSize } from "ahooks";

type IFrameProps = {
  url: string;
};

const IFrame: FC<IFrameProps> = ({ url }) => {
  const size = useSize(document.documentElement);
  return (
    <div style={{ height: (size?.height || 0) - 88 + "px" }}>
      <iframe className="w-full h-full" src={url} />
    </div>
  );
};

export default IFrame;
