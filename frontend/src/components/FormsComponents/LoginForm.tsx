import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FormProps } from "../../interfaces/interfaces";
import AuthLayout from "../AuthComponents/AuthLayout";
import InputField from "../InputField";
import AuthContext from "../../contexts/AuthContext";
import { handleApiError } from "../../utils/errorHandler";
import { serverRequests } from "../../utils/serverRequests";

const LoginForm: React.FC<FormProps> = ({ onSwitch }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useContext(AuthContext);
  const { loginRequest } = serverRequests();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await loginRequest(email, password);
      const { token } = response.data;
      login(token);
      navigate("/protected");
      toast.success("Login realizado com sucesso, redirecionando...");
    } catch (error: unknown) {
      const errorMessage = handleApiError(
        error,
        "Falha ao realizar a operação"
      );
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Login"
      footer={
        <span>
          Não tem cadastro?{" "}
          <button onClick={onSwitch} className="text-blue-500 hover:underline">
            Registre-se
          </button>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="E-mail"
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Senha"
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className={`w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 ${
            loading ? "cursor-not-allowed bg-gray-500 hover:bg-gray-700" : ""
          }`}
        >
          {loading ? "Aguarde..." : "Entrar"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginForm;
