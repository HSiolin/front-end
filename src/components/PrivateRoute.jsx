import { Navigate } from "react-router-dom";
import { getUsuario } from "../services/auth";

function PrivateRoute({ children }) {
  const usuario = getUsuario();

  if (!usuario) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
