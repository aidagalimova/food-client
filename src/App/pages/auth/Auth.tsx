import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useAuth, AuthFormData } from 'store/rootStore/authStore';
import Input from 'components/Input';
import Button from 'components/Button';
import Text, { TextView, TextWeight, TextTag } from 'components/Text';

import styles from './Auth.module.scss';

const Auth = observer(() => {
  const { isLoading, error: storeError, handleLogin, handleRegister } = useAuth();

  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (storeError?.message) {
      setErrorText(storeError.message);
    }
  }, [storeError]);

  const clearError = () => {
    setErrorText('');
  };

  const handleChange = (field: keyof AuthFormData) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    clearError();
  };

  const toggleMode = () => {
    setIsLoginMode((prev) => !prev);
    clearError();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoginMode) {
      await handleLogin({
        identifier: formData.email,
        password: formData.password,
      });
    } else {
      if (formData.password !== formData.confirmPassword) {
        setErrorText('Passwords do not match');
        return;
      }

      await handleRegister({
        email: formData.email,
        password: formData.password,
        username: formData.username,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
    });
    clearError();
  };

  useEffect(() => {
    resetForm();
  }, [isLoginMode]);

  const isFormValid = () => {
    if (isLoginMode) {
      return formData.email.trim() !== '' && formData.password.trim() !== '';
    }
    return (
      formData.email.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.confirmPassword.trim() !== '' &&
      formData.username.trim() !== ''
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <Text view={TextView.TITLE} weight={TextWeight.BOLD} tag={TextTag.H1} className={styles.title}>
          {isLoginMode ? 'Sign In' : 'Sign Up'}
        </Text>

        <form onSubmit={onSubmit} className={styles.form}>
          {!isLoginMode && (
            <div className={styles.formGroup}>
              <label htmlFor="username">Username:</label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange('username')}
                required
                placeholder="Enter username"
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange('email')}
              type="email"
              required
              placeholder="Enter email"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password:</label>
            <Input
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange('password')}
              type="password"
              required
              placeholder="Enter password"
            />
          </div>

          {!isLoginMode && (
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                type="password"
                required
                placeholder="Confirm password"
              />
            </div>
          )}

          <div className={styles.errorWrapper}>
            {errorText && (
              <Text view={TextView.P_14} className={styles.error}>
                {errorText}
              </Text>
            )}
          </div>

          <Button type="submit" disabled={!isFormValid()} loading={isLoading} className={styles.submitButton}>
            {isLoginMode ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>

        <div className={styles.links}>
          <Text view={TextView.P_14}>
            {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
            <span onClick={toggleMode} className={styles.link}>
              {isLoginMode ? 'Sign Up' : 'Sign In'}
            </span>
          </Text>
        </div>
      </div>
    </div>
  );
});

export default Auth;
