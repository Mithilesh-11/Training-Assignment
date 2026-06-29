import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  return function AuthGuard(props: P) {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
