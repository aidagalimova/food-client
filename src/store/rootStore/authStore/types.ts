export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

export interface LoginData {
  identifier: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}
