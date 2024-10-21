import { ReactNode } from "react";

export interface AuthLayoutProps {
  title: string;
  children: ReactNode;
  footer: ReactNode;
}

export interface FormProps {
  onSwitch: () => void;
}

export interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  value: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface AuthContextProps {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}
