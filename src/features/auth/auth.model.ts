export interface User {
  id: string;
  email: string;
  name: string;
  address?: string;
  avatar: 'string';
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  name: string;
  address?: string;
  avatar: 'string';
  password: string;
  confirmPassword: string;
}
