import {
  AppstoreOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Dropdown, Flex, Tooltip } from "antd";
import { FC, useContext, useState } from "react";
import QueryContext from "./content";

export type IQueryProps = {
  children?: React.ReactNode;
};

const Toolbar: FC<IQueryProps> = ({ children }) => {
  const {
    queryFn,
    hideSearch,
    setHideSearch,
    allColumns,
    visibleColumnKeys,
    setVisibleColumnKeys,
    enableColumnVisibility,
  } = useContext(QueryContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleHideSearch = () => {
    setHideSearch(!hideSearch);
  };

  const handleRefresh = () => {
    queryFn?.();
  };

  const handleColumnVisibilityChange = (checkedValues: string[]) => {
    setVisibleColumnKeys(checkedValues);
  };

  // 生成列选项，过滤掉固定列（不允许隐藏的列）
  const columnOptions =
    allColumns
      ?.map((col) => {
        const key =
          col?.key || ("dataIndex" in col ? col.dataIndex : undefined);
        return {
          label: col?.title as string,
          value: key as string,
          fixed: col?.fixed, // 保留固定标识
        };
      })
      .filter((option) => option.value && !option.fixed) || []; // 过滤掉固定列

  return (
    <Flex gap={12} className="!mb-2" wrap="wrap" justify="space-between">
      <Flex gap="small" wrap="wrap">
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
        {enableColumnVisibility && (
          <Tooltip title="显隐列">
            <Dropdown
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
              trigger={["click"]}
              open={dropdownOpen}
              onOpenChange={setDropdownOpen}
              dropdownRender={() => (
                <div
                  className="bg-white py-2 px-3 rounded shadow min-w-[120px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mb-2 text-sm font-medium text-gray-700">
                    显隐列
                  </div>
                  <Checkbox.Group
                    className="flex flex-col gap-1"
                    options={columnOptions}
                    value={visibleColumnKeys}
                    onChange={handleColumnVisibilityChange}
                  />
                </div>
              )}
            >
              <Button shape="circle" icon={<AppstoreOutlined />} />
            </Dropdown>
          </Tooltip>
        )}
      </Flex>
    </Flex>
  );
};

export default Toolbar;
