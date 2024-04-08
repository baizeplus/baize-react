import { FC, useEffect, useState } from "react";
import { Col, Row, Spin } from "antd";
import { getServer } from "@/api/monitor/server";
import CpuInfoCard from "./components/CpuInfoCard";
import MemCard from "./components/MemCard";
import SysInfoCard from "./components/SysInfoCard";
import GolangInfoCard from "./components/GolangInfoCard";
import DiskCard from "./components/DiskCard";

const Server: FC = () => {
  const [data, setData] = useState<IServer>();
  const [loading, setLoading] = useState(true);

  const getServerInfo = async () => {
    try {
      const { data } = await getServer();
      setData(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServerInfo();
  }, []);

  return (
    <Spin spinning={loading}>
      <Row gutter={12}>
        <Col xs={24} md={12} className="!mb-3">
          <CpuInfoCard data={data} />
        </Col>
        <Col xs={24} md={12} className="!mb-3">
          <MemCard data={data} />
        </Col>
      </Row>

      <Row gutter={12}>
        <Col xs={24} md={12} className="!mb-3">
          <SysInfoCard data={data} />
        </Col>
        <Col xs={24} md={12} className="!mb-3">
          <GolangInfoCard data={data} />
        </Col>
      </Row>

      <DiskCard data={data} />
    </Spin>
  );
};

export default Server;
