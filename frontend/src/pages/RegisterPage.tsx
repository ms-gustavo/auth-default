import React from "react";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";
import ProvidersLogin from "../components/ProvidersLogin";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <RegisterForm
          onSwitch={() => {
            navigate("/");
          }}
        />
        <div className="text-center text-gray-500">ou</div>
        <ProvidersLogin />
      </div>
    </div>
  );
};

export default RegisterPage;
