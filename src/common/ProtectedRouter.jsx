import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "src/context";

function ProtectedRouter({ forLogged }) {
  const { currentUser } = useContext(AuthContext);
  if (forLogged) {
    return currentUser ? <Outlet /> : <Navigate to={"/login"} replace />;
  }
  return currentUser ? <Navigate to={"/"} replace /> : <Outlet />;
}

export default ProtectedRouter;
