import React, { useContext, useState } from "react";
import { LoginFormProps } from "../interfaces/interfaces";
import AuthLayout from "./AuthLayout";
import InputField from "./InputField";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      console.log(email, password);
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      const { token } = response.data;
      navigate("/protected");
      login(token);
    } catch (error: unknown) {
      console.error(error);
      setError("Falha ao realizar login");
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
        {error && <p className="text-red-500">{error}</p>}
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
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Entrar
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginForm;
