import { ReactNode } from 'react';

export interface CredentialType {
  _id: string;
  name: string;
  role: string;
}

export interface AuthContextType {
  _id: string | undefined;
  name: string | undefined;
  role: string | undefined;
  isAuthenticated: boolean;
  storeCredential: (credential: CredentialType) => void;
  logout: () => void;
}

export interface AuthContextProps {
  children: ReactNode;
}
