import { FC } from "react";
import { Card } from "antd";

import Query from "@/components/QueryTable";
import DictDataTable from "./components/DictDataTable";
import DictDataToolbar from "./components/DictDataToolbar";
import TypeTableSearchForm from "./components/TypeTableSearchForm";

const DictData: FC = () => {
  return (
    <Query>
      <TypeTableSearchForm />

      <Card className="!my-2 shadow-sm" classNames={{ body: "!p-4" }}>
        <DictDataToolbar />
        <DictDataTable />
      </Card>
    </Query>
  );
};

export default DictData;
