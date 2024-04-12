import { FC, useCallback } from "react";
import { Flex, TableProps, Tooltip } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import Query from "@/components/QueryTable";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import { DeleteConfirm, DictTag } from "@/components";
import { useParams } from "react-router-dom";
import { delDictData, getDictDataList } from "@/api/system/dict/data";
import UpdateDataDrawer from "./TableActive/UpdateDataDrawer";
import useDict from "@/hooks/useDict";

const DictTypeTable: FC = () => {
  const { dictType } = useParams<"dictType">();
  const { queryFn } = Query.useQueryTable();
  const [sys_normal_disable] = useDict(["sys_normal_disable"]);

  const columns: TableProps<IDictItem>["columns"] = [
    {
      title: "字典编码",
      dataIndex: "dictCode",
      key: "dictCode",
      align: "center",
    },
    {
      title: "字典标签",
      dataIndex: "dictLabel",
      key: "dictLabel",
      align: "center",
      ellipsis: true,
    },
    {
      title: "字典键值",
      dataIndex: "dictValue",
      key: "dictValue",
      align: "center",
      ellipsis: true,
    },
    {
      title: "字典排序",
      dataIndex: "dictSort",
      key: "dictSort",
      align: "center",
      ellipsis: true,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      align: "center",
      ellipsis: true,
      render: (t) => <DictTag options={sys_normal_disable} value={t} />,
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "postSort",
      align: "center",
      ellipsis: true,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      align: "center",
      width: 160,
      ellipsis: true,
      render: (t: string) => dayjs(t).format(YYYY_MM_DD_HH_mm),
    },
    {
      title: "操作",
      dataIndex: "active",
      key: "active",
      align: "center",
      width: 70,
      render: (_, r) => {
        return (
          <Flex gap={8}>
            <UpdateDataDrawer id={r.dictCode}>
              <Tooltip placement="top" title="修改">
                <FormOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
              </Tooltip>
            </UpdateDataDrawer>
            <DeleteConfirm
              id={r.dictCode}
              text={`是否确认删除字典编码为"${r.dictCode}"的数据项?`}
              delFn={delDictData}
              onSuccess={queryFn}
            >
              <Tooltip placement="top" title="删除">
                <DeleteOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
              </Tooltip>
            </DeleteConfirm>
          </Flex>
        );
      },
    },
  ];

  const getList = useCallback(
    (ret: IDictItem) => getDictDataList({ ...ret, dictType: dictType || "" }),
    [dictType],
  );

  return (
    <>
      <Query.Table
        rowKey={(e) => e.dictCode}
        isPagination
        isRowSelection
        queryFn={getList}
        columns={columns}
      />
    </>
  );
};

export default DictTypeTable;
