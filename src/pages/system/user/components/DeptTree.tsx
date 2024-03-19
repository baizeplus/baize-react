import { FC, useEffect, useState } from "react";
import { Skeleton, Tree, TreeDataNode } from "antd";
import { getDeptList } from "@/api/system/dept";
import { handleTree } from "@/utils/baize";

type IDeptTree = {
  search?: string;
  onSearch?: (deptId: string) => void;
};

const DeptTree: FC<IDeptTree> = ({ search, onSearch }) => {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  const [loading, setLoading] = useState(false);
  const [deptList, setDeptList] = useState<TreeDataNode[]>([]);

  const getDeptTree = async () => {
    try {
      setLoading(true);
      const { data = [] } = await getDeptList();
      const dateNodeList = data.map((item: IDeptItem) => ({
        title: item.deptName,
        key: item.deptId,
        parentId: item.parentId,
      }));
      const list: TreeDataNode[] = handleTree(dateNodeList, "key", "parentId");
      setDeptList(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDeptTree();
  }, []);

  const handleSelect = (selectedKeys: React.Key[]) => {
    onSearch?.(selectedKeys[0] as string);
    setSelectedKeys(selectedKeys);
  };

  return (
    <div className="mt-4">
      <Skeleton active loading={loading}>
        <Tree
          className="truncate"
          // showLine
          defaultExpandAll
          selectedKeys={selectedKeys}
          treeData={deptList}
          onSelect={handleSelect}
          filterTreeNode={(node) =>
            Boolean(search && node.title?.toString()?.indexOf(search) !== -1)
          }
        />
      </Skeleton>
    </div>
  );
};

export default DeptTree;
