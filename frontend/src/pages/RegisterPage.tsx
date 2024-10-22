import React from "react";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";
import ProvidersLogin from "../components/ProvidersLogin";
import ImageAuthComponent from "../components/ImageAuthComponent";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-full h-full max-w-full max-h-full bg-white rounded-lg shadow-md overflow-hidden">
        <ImageAuthComponent />
        <div className="w-full md:w-1/2 h-screen p-8 space-y-6 flex flex-col justify-center">
          <RegisterForm
            onSwitch={() => {
              navigate("/");
            }}
          />
          <div className="text-center text-gray-500">ou</div>
          <ProvidersLogin />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
