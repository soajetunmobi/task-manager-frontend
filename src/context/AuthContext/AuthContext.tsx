import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AuthContextProps, AuthContextType, CredentialType } from './AuthContext.types';

const AuthContext = createContext<AuthContextType>({
  _id: undefined,
  name: undefined,
  role: undefined,
  isAuthenticated: false,
  storeCredential: credential => {},
  logout: () => {},
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthContextProvider');
  }
  return context;
};

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [name, setName] = useState<string | undefined>();
  const [authUserId, setAuthUserId] = useState<string | undefined>();
  const [role, setRole] = useState<string | undefined>();

  const storeCredential = useCallback(({ _id, name, role }: CredentialType) => {
    setAuthUserId(_id);
    setName(name);
    setRole(role);
  }, []);

  const logout = () => {
    console.log('Logging out...');
    setAuthUserId(undefined);
    setName(undefined);
    setRole(undefined);
  };

  const isUserAuthenticated = useCallback((): boolean => {
    return !!(authUserId && authUserId?.length > 0);
  }, [authUserId]);

  const value = useMemo(() => {
    return {
      _id: authUserId,
      name: name,
      role: role,
      isAuthenticated: isUserAuthenticated(),
      storeCredential: storeCredential,
      logout: logout,
    };
  }, [authUserId, name, role, isUserAuthenticated, storeCredential]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
