import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const ProvidersLogin: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2 justify-center items-center">
      <button
        onClick={() => {
          window.location.href = "http://localhost:3000/auth/google";
        }}
        className="flex items-center justify-center w-full px-4 py-2 text-black bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <FcGoogle className="mr-2" />
        Entrar com Google
      </button>
      <button
        onClick={() => {
          window.location.href = "http://localhost:3000/auth/github";
        }}
        className="flex items-center justify-center w-full px-4 py-2 text-black bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <FaGithub className="mr-2" />
        Entrar com GitHub
      </button>
    </div>
  );
};

export default ProvidersLogin;
