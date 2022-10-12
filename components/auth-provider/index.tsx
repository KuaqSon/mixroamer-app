import { ReactNode } from 'react';
import { AuthContext, useProvideAuth } from 'src/context/auth-context';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
