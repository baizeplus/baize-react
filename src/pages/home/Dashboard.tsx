import { FC } from "react";
import { Button, Card, Col, Flex, Row, Tag, Typography } from "antd";
import { CloudOutlined, HomeOutlined } from "@ant-design/icons";
// import useRouterbeforeEach from "@/hooks/useRouterbeforeEach";

const Dashboard: FC = () => {
  // const { pathname } = useLocation();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   console.log('pathname', getToken())
  //   if(!getToken()) {
  //     navigate('/login')
  //   }

  // }, [navigate, pathname]);

  return (
    // <Layout>
    <div>
      <Row gutter={30} className=" bg-white p-4 rounded mb-3 mx-3">
        <Col className="mb-6">
          <Typography.Title level={3}>白泽开源管理系统React</Typography.Title>
          <Typography.Text>
            <strong>当前版本:</strong> v1.0.0
          </Typography.Text>
          <div className="mt-3">
            <Tag color="processing" className="w-auto">
              ¥免费开源
            </Tag>
          </div>
          <Flex gap={8} className="mt-3">
            <Button
              type="primary"
              ghost
              icon={<CloudOutlined />}
              href="https://gitee.com/baizeplus/baize"
              target="_blank"
            >
              访问码云后端
            </Button>
            <Button
              type="primary"
              ghost
              icon={<CloudOutlined />}
              href="https://gitee.com/baizeplus/baize-react"
              target="_blank"
            >
              访问码云React
            </Button>
            <Button
              type="primary"
              ghost
              icon={<CloudOutlined />}
              href="https://gitee.com/baizeplus/baize-vue"
              target="_blank"
            >
              访问码云Vue
            </Button>
            <Button
              icon={<HomeOutlined />}
              href="http://ibaize.vip/"
              target="_blank"
            >
              访问主页
            </Button>
          </Flex>
        </Col>
        <Col className="flex flex-col">
          <Typography.Title level={3}>技术选型</Typography.Title>
          <ol className="text-gray-500">
            <li>React</li>
            <li>antd</li>
            <li>zustand</li>
            <li>axios</li>
            <li>dayjs</li>
            <li>ahooks</li>
            <li>...</li>
          </ol>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col xs={24} md={8} className="mb-3">
          <Card title="联系信息">
            <p>官网：http://www.ibaize.vip</p>
            <p>QQ群： 83064682</p>
          </Card>
        </Col>
        <Col xs={24} md={8} className="mb-3">
          <Card title="更新日志">React版本持续迭代中</Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="捐赠支持">你可以请作者喝杯咖啡表示鼓励</Card>
        </Col>
      </Row>
    </div>
    // </Layout>
  );
};

export default Dashboard;
