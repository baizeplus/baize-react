import { FC, useContext } from "react";
import QueryForm from "../QueryForm/QueryForm";
import QueryContext from "./content";
import { Card } from "antd";

type IQueryFormProps = {
  children: React.ReactNode;
  onParamsFormat?: (params: object) => object;
};

const QForm: FC<IQueryFormProps> = ({ children, onParamsFormat }) => {
  const { setParams, hideSearch } = useContext(QueryContext);
  const onSearch = (params: object) => {
    setParams(onParamsFormat ? onParamsFormat(params) : params);
  };
  return hideSearch ? null : (
    <Card className="shadow-sm" classNames={{ body: "!p-4 !pb-0" }}>
      <QueryForm onSearch={onSearch}>{children}</QueryForm>
    </Card>
  );
};

export default QForm;
