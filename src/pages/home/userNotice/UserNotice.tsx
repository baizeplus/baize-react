import { FC } from "react";
import { useParams } from "react-router-dom";

const UserNotice: FC = () => {
  const { id } = useParams<"id">();

  return <div>UserNotice {id}</div>;
};

export default UserNotice;
