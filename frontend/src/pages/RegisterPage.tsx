import React from "react";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";

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
        <div className="space-y-2">
          <button className="w-full px-4 py-2 text-black bg-gray-100 rounded-md hover:bg-gray-200">
            Entrar com Google
          </button>
          <button className="w-full px-4 py-2 text-black bg-gray-100 rounded-md hover:bg-gray-200">
            Entrar com GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
