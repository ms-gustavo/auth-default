import React, { useContext, useState } from "react";
import { FormProps } from "../interfaces/interfaces";
import AuthLayout from "./AuthLayout";
import InputField from "./InputField";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const LoginForm: React.FC<FormProps> = ({ onSwitch }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      const { token } = response.data;
      login(token);
      navigate("/protected");
      toast.success("Login realizado com sucesso, redirecionando...");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        let errorMessage;
        if (error.response.data.message !== "Erro de validação") {
          errorMessage =
            error.response.data.message || "Falha ao realizar o login";
          toast.error(errorMessage);
          setError(errorMessage);
        }
        errorMessage =
          error.response.data.errors[0].errors[0] ||
          "Falha ao realizar o cadastro";
        toast.error(errorMessage);
        setError(errorMessage);
      } else {
        setError("Falha ao realizar o cadastro");
      }
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
            loading ? "cursor-not-allowed bg-gray-500" : ""
          }`}
        >
          {loading ? "Aguarde..." : "Entrar"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginForm;
