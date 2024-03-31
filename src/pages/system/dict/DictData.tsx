import { FC } from "react";
import { Card } from "antd";

import Query from "@/components/QueryTable";
import DictTypeTable from "./components/DictTypeTable";
import DictTypeToolbar from "./components/DictTypeToolbar";
import TypeTableSearchForm from "./components/TypeTableSearchForm";

const DictData: FC = () => {
  return (
    <Query>
      <TypeTableSearchForm />

      <Card className="!my-2 shadow-sm" classNames={{ body: "!p-4" }}>
        <DictTypeToolbar />
        <DictTypeTable />
      </Card>
    </Query>
  );
};

export default DictData;
