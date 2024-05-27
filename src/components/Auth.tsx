import { usePermissions } from "@/hooks/usePermissions";
import { FC, PropsWithChildren } from "react";

interface AuthProps {
  role: string;
}

const Auth: FC<PropsWithChildren<AuthProps>> = ({ children, role }) => {
  const { hasAuth } = usePermissions();

  if (hasAuth(role)) {
    return <>{children}</>;
  }

  return null;
};

export default Auth;
