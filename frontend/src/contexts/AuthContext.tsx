import React, { createContext, useEffect, useState } from "react";
import { AuthContextProps } from "../interfaces/interfaces";

const AuthContext = createContext<AuthContextProps>({
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("tokenSavedAt", new Date().toISOString());
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenSavedAt");
  };

  useEffect(() => {
    const tokenSavedAt = localStorage.getItem("tokenSavedAt");
    if (
      tokenSavedAt &&
      new Date().getTime() - new Date(tokenSavedAt).getTime() >
        24 * 60 * 60 * 1000
    ) {
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
