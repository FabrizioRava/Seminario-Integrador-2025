'use client';

import Cookies from 'js-cookie';
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

class AuthService {
  async login(credentials: LoginDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    const { access_token, user } = response.data;

    if (access_token && user) {
      const authData = { token: access_token, ...user };
      Cookies.set('user', JSON.stringify(authData), { expires: 1, path: '/' });
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
    Cookies.remove('user', { path: '/' });
    setAuthToken(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  getStoredUser(): User | null {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        return userData;
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}

export default new AuthService();
