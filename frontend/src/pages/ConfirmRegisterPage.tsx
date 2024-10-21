import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

const ConfirmRegisterPage: React.FC = () => {
  const { confirmId } = useParams<{ confirmId: string }>();
  const [statusMessage, setStatusMessage] = useState<string>("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const confirmRegistration = async () => {
      try {
        console.log("CHAMEI");
        const response = await axios.get(
          `http://localhost:3000/auth/confirm/${confirmId}`
        );
        setStatusMessage(
          response.data.message || "Registro confirmado com sucesso!"
        );
        const { token } = response.data;
        login(token);
        navigate("/protected");
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message;
          setStatusMessage(errorMessage || "Falha ao confirmar o registro");
        } else {
          setStatusMessage("Falha ao confirmar o registro");
        }
      }
    };

    if (confirmId) {
      confirmRegistration();
    }
  }, [confirmId, login, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Confirmação de Registro</h2>
        <p className="text-center text-gray-700">{statusMessage}</p>
      </div>
    </div>
  );
};

export default ConfirmRegisterPage;
