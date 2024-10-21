import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const ProtectedPage: React.FC = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Bem-vindo!</h1>
        <p className="mt-2 text-gray-600">
          Você está autenticado e pode acessar esta página protegida.
        </p>
        <button
          onClick={logout}
          className="mt-4 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default ProtectedPage;
