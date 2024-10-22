import React, { useContext, useEffect } from "react";
import { AuthLayoutProps } from "../interfaces/interfaces";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children, footer }) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      console.log(token);
      navigate("/protected");
    }
  }, [token, navigate]);
  return (
    <div className="flex items-center justify-center h-auto">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">{title}</h2>
        <div className="space-y-4">{children}</div>
        <div className="text-center text-gray-500">{footer}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
