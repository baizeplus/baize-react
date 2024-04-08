import IFrame from "@/components/iFrame";
import { FC } from "react";

const Swagger: FC = () => {
  return (
    <div className="overflow-hidden	">
      <IFrame url={`${import.meta.env.VITE_APP_BASE_API}/swagger/index.html`} />
    </div>
  );
};

export default Swagger;
