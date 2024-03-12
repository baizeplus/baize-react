import Layout from "./components/Layout";
import LoginForm from "./components/LoginForm";
import { FC } from "react";

const Login: FC = () => {
  return (
   <Layout>
      <LoginForm />
    </Layout>
  );
};

export default Login;
