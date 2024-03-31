import { FC } from "react";
import { Dayjs } from "dayjs";

import Query from "@/components/QueryTable";
import TypeForm from "./TypeForm";

type ISearchParams = {
  roleName?: string;
  status?: string;
  dataScope?: Dayjs[];
};

type ITableSearchFormProps = {
  onSearch?: (params: ISearchParams) => void;
};

const TypeTableSearchForm: FC<ITableSearchFormProps> = () => {
  return (
    <Query.Form>
      <TypeForm />
    </Query.Form>
  );
};

export default TypeTableSearchForm;
