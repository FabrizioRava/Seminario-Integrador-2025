
import axios, { AxiosError, AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

type AuthStorage = {
  token: string;
  user: {
    id: number;
    email: string;
    rol: string;
  };
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
  timeout: 10000, 
});

const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;

  const storedAuth = localStorage.getItem('autogestion.auth');
  if (storedAuth) {
    try {
      const parsed: AuthStorage = JSON.parse(storedAuth);
      return parsed.token;
    } catch (error) {
      console.warn('Error parsing auth storage', error);
      localStorage.removeItem('autogestion.auth');
    }
  }

  const oldToken = localStorage.getItem('token');
  if (oldToken) {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const authData: AuthStorage = {
          token: oldToken,
          user: {
            id: user.id,
            email: user.email,
            rol: user.rol
          }
        };
        localStorage.setItem('autogestion.auth', JSON.stringify(authData));
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return oldToken;
      } catch (e) {
        console.error('Error migrating auth data', e);
      }
    }
  }

  return null;
};

export const setAuthToken = (token: string | null) => {
  if (token) {
    const authToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    api.defaults.headers.common['Authorization'] = authToken;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

if (typeof window !== 'undefined') {
  const token = getAuthToken();
  if (token) {
    setAuthToken(token);
  }
}

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = getAuthToken();
      if (token) {
        if (config.headers) {
          if (config.headers instanceof AxiosHeaders) {
            if (!config.headers.has('Authorization')) {
              config.headers.set('Authorization', `Bearer ${token}`);
            }
          } else {
            const headers = (config.headers as unknown as Record<string, string>);
            if (!headers.Authorization) {
              headers.Authorization = `Bearer ${token}`;
            }
            config.headers = headers as unknown as AxiosHeaders;
          }
        } else {
          config.headers = new AxiosHeaders({ Authorization: `Bearer ${token}` });
        }
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (!error.config) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (error.response?.status === 404 && originalRequest.url?.includes('/auth/profile')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        delete api.defaults.headers.common['Authorization'];
      }
      return Promise.reject(new Error('Sesión no válida'));
    }

    if (error.response?.status === 401 && !originalRequest.url?.includes('/auth/login')) {
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        const isAuthRoute = currentPath.includes('/login') || currentPath.includes('/auth');
        const isInscripcionRoute = currentPath.includes('/inscripciones');
        const isHorarioRoute = currentPath.includes('/mi-horario');

        if (isInscripcionRoute || isHorarioRoute) {
          return Promise.reject(error);
        }

        if (!isAuthRoute) {
          localStorage.removeItem('auth_token');
          delete api.defaults.headers.common['Authorization'];
          window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
