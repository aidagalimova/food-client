import { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'store/rootStore/authStore/useAuth';

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Fragment>{children}</Fragment>;
};

export default PrivateRoute;
