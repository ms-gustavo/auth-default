import React from "react";

const ProvidersLogin: React.FC = () => {
  return (
    <div className="space-y-2">
      <button
        onClick={() => {
          window.location.href = "http://localhost:3000/auth/google";
        }}
        className="w-full px-4 py-2 text-black bg-gray-100 rounded-md hover:bg-gray-200"
      >
        Entrar com Google
      </button>
      <button className="w-full px-4 py-2 text-black bg-gray-100 rounded-md hover:bg-gray-200">
        Entrar com GitHub
      </button>
    </div>
  );
};

export default ProvidersLogin;
