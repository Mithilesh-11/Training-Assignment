import { ComponentType } from "react";
import { Navigate } from "react-router-dom";

function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  return function AuthGuard(props: P) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
