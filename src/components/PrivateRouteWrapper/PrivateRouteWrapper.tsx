import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { useAuthContext } from '../../context/AuthContext/AuthContext';

export const PrivateRouteWrapper: React.FC<{ children: ReactElement }> = ({ children }) => {
  const { _id } = useAuthContext();

  return _id && _id?.length !== 0 ? children : <Navigate to={routes.signIn} />;
};
