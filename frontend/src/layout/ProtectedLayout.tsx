import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../redux/app/hooks";

const ProtectedLayout = () => {
  const user = useAppSelector((state) => state.user.user);

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
