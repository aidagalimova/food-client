import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import type { LoginData, RegisterData } from './types';
import rootStore from '../instance';

export const useAuth = () => {
  const { isLoading, error, isAuthenticated, login, register, logout } = rootStore.auth;
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (data: LoginData) => {
      const success = await login(data);
      if (success) {
        navigate('/');
      }
      return success;
    },
    [navigate],
  );

  const handleRegister = useCallback(
    async (data: RegisterData) => {
      const success = await register(data);
      if (success) {
        navigate('/');
      }
      return success;
    },
    [navigate],
  );

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [navigate]);

  return {
    isLoading,
    error,
    isAuthenticated,

    handleLogin,
    handleRegister,
    handleLogout,
  };
};
