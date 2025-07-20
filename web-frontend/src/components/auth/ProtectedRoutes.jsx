
import { useAuth } from "../../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.user_type)) return <Navigate to="/unauthorized" />;
  return children;
};

export default ProtectedRoute;
