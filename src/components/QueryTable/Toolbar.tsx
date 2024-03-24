import { FC, useContext } from "react";
import { Button, Checkbox, Dropdown, Flex, Tooltip } from "antd";
import {
  AppstoreOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import QueryContext from "./content";

export type IQueryProps = {
  children?: React.ReactNode;
};

const Toolbar: FC<IQueryProps> = ({ children }) => {
  const { queryFnRef, hideSearch, setHideSearch } = useContext(QueryContext);

  const handleHideSearch = () => {
    setHideSearch(!hideSearch);
  };

  const handleRefresh = () => {
    if (queryFnRef?.current) {
      queryFnRef?.current();
    }
  };

  return (
    <Flex justify="space-between" className="mb-2">
      <Flex gap="small">
        <span />
        {children}
      </Flex>
      <Flex gap="small">
        <Tooltip title={hideSearch ? "显示搜索" : "隐藏搜索"}>
          <Button
            shape="circle"
            icon={<SearchOutlined />}
            onClick={handleHideSearch}
          />
        </Tooltip>
        <Tooltip title="刷新">
          <Button
            shape="circle"
            icon={<SyncOutlined />}
            onClick={handleRefresh}
          />
        </Tooltip>
        <Tooltip title="显隐列">
          <Dropdown
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
            trigger={["click"]}
            dropdownRender={() => (
              <div className="bg-white py-2 px-3 rounded shadow">
                <Checkbox.Group
                  className="flex flex-col"
                  // options={columns.map(item => item.title)}
                />
              </div>
            )}
          >
            <Button shape="circle" icon={<AppstoreOutlined />} />
          </Dropdown>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default Toolbar;
