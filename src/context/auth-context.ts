import { useState, useEffect, useContext, createContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import { IAuthContext, IUser } from 'src/interfaces/auth';
import { getCurrentUserApi } from 'src/utils/api';
import * as AuthService from 'src/services/auth-service';

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function useProvideAuth(): IAuthContext {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  const initUser = useCallback(async () => {
    const resp = await getCurrentUserApi();
    if (resp?.status === 200 && resp?.data?.user) {
      setUser(resp.data.user);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    initUser();
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    AuthService.logOut();
    router.push('/account/login');
  }, []);

  return {
    isLoaded,
    user,
    isAuthenticated: !!user,
    signOut,
  };
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a provider');
  }
  return context;
};
