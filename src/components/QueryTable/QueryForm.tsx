import { FC, useContext, useEffect } from "react";
import QueryForm from "../QueryForm/QueryForm";
import QueryContext from "./content";
import { Card } from "antd";

type IQueryFormProps = {
  params?: object;
  children: React.ReactNode;
  onParamsFormat?: (params: object) => object;
};

const QForm: FC<IQueryFormProps> = ({ children, params, onParamsFormat }) => {
  const { setParams, hideSearch } = useContext(QueryContext);
  const onSearch = (params: object) => {
    setParams(onParamsFormat ? onParamsFormat(params) : params);
  };

  useEffect(() => {
    if (params) {
      setParams(params);
    }
  }, [params, setParams]);

  return hideSearch ? null : (
    <Card className="shadow-sm " classNames={{ body: "!p-4 !pb-0" }}>
      <QueryForm onSearch={onSearch}>{children}</QueryForm>
    </Card>
  );
};

export default QForm;
