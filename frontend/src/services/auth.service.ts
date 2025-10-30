import api, { setAuthToken } from './api';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  dni: string;
  legajo: string;
  rol?: string;
}

export interface User {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  dni: string;
  legajo: string;
  rol: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

type AuthStorage = {
    token: string;
    user: User;
  };

class AuthService {
  async login(credentials: LoginDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    const { access_token, user } = response.data;

    if (access_token && user) {
      const authData: AuthStorage = {
        token: access_token,
        user: user,
      };
      localStorage.setItem('autogestion.auth', JSON.stringify(authData));
      setAuthToken(access_token);
    }
    return response.data;
  }

  async register(data: RegisterDto): Promise<User> {
    const response = await api.post<User>('/auth/register', data);
    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/auth/profile');
    return response.data;
  }

  logout() {
    localStorage.removeItem('autogestion.auth');
    localStorage.removeItem('token'); // for old versions
    localStorage.removeItem('user'); // for old versions
    setAuthToken(null);
    if (typeof window !== 'undefined') {
        window.location.href = '/login';
    }
  }

  getStoredUser(): User | null {
    if (typeof window === 'undefined') return null;
    const authStr = localStorage.getItem('autogestion.auth');
    if (authStr) {
      try {
        const authData: AuthStorage = JSON.parse(authStr);
        return authData.user;
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    const authStr = localStorage.getItem('autogestion.auth');
    if (authStr) {
      try {
        const authData: AuthStorage = JSON.parse(authStr);
        return !!authData.token;
      } catch (e) {
        return false;
      }
    }
    // Fallback for migration
    return !!localStorage.getItem('token');
  }
}

export default new AuthService();
