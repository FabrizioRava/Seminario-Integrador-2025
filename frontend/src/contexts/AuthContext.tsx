'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AuthService, { User } from '@/services/auth.service';

type UserRole = 'admin' | 'profesor' | 'estudiante' | 'secretaria_academica';

// Retorna la ruta de inicio según el rol del usuario
export const getHomePathByRole = (role: UserRole = 'estudiante'): string => {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'profesor':
      return '/profesor';
    case 'estudiante':
      return '/dashboard';
    case 'secretaria_academica':
      return '/secretaria';
    default:
      return '/';
  }
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<User>;
  logout: () => void;
  getHomePathByRole: (role?: UserRole) => string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadAuthData = () => {
      setLoading(true);
      try {
        const storedUser = AuthService.getStoredUser();
        if (storedUser) {
          setUser(storedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const login = useCallback(
    async (identifier: string, password: string): Promise<User> => {
      try {
        setLoading(true);
        const { user } = await AuthService.login({ email: identifier, password });
        setUser(user);
        setIsAuthenticated(true);
        return user;
      } catch (error: any) {
        console.error('Error en el inicio de sesión:', error);
        throw new Error(error.response?.data?.message || 'Error en la autenticación');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  }, [router]);

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    getHomePathByRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
