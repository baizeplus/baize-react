import { FC, Key, useEffect, useState } from "react";
import { Empty, Tree } from "antd";
import type { DataNode, TreeProps } from "antd/lib/tree";

type ICheckedKeys = Key[] | { checked: Key[]; halfChecked: Key[] };

interface IProps extends TreeProps {
  className?: string;
  fieldNames?: TreeProps["fieldNames"];
  treeData?: DataNode[];
  value?: React.Key[];
  onChange?: (checkedKeys: ICheckedKeys, halfCheckedKeys?: React.Key[]) => void;
}

interface CheckInfo {
  checked: boolean;
  checkedNodes: DataNode[];
  halfCheckedKeys?: React.Key[];
}

const TreeForm: FC<IProps> = ({
  className,
  treeData = [],
  fieldNames,
  value,
  onChange,
  ...p
}) => {
  const [checkedKeys, setCheckedKeys] = useState<ICheckedKeys>();

  const onCheck = (checked: ICheckedKeys, e: CheckInfo) => {
    setCheckedKeys(checked);
    onChange?.(checked, e.halfCheckedKeys);
  };

  useEffect(() => {
    if (value) setCheckedKeys(value);
  }, [value]);

  return !treeData.length ? (
    <Empty
      className={`!py-6 !m-0 ${className}`}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  ) : (
    <Tree
      checkable
      className={className}
      checkedKeys={checkedKeys}
      fieldNames={fieldNames}
      selectable={false}
      treeData={treeData}
      onCheck={onCheck}
      {...p}
    />
  );
};

export default TreeForm;
