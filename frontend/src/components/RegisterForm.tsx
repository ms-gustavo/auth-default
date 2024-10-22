import { useState } from "react";
import axios from "axios";
import { FormProps } from "../interfaces/interfaces";
import AuthLayout from "./AuthLayout";
import InputField from "./InputField";
import toast from "react-hot-toast";

const RegisterForm: React.FC<FormProps> = ({ onSwitch }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/auth/register", {
        name,
        email,
        password,
      });
      setName("");
      setEmail("");
      setPassword("");
      setSuccessMessage(response.data.message);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage: string =
          error.response.data.message || "Falha ao realizar o cadastro";
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
      title="Cadastre-se"
      footer={
        <span>
          Já tem cadastro?{" "}
          <button onClick={onSwitch} className="text-blue-500 hover:underline">
            Entre aqui
          </button>
        </span>
      }
    >
      {successMessage ? (
        <p className="text-green-500">{successMessage}</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            <InputField
              label="Nome"
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              className={`w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 ${
                loading ? "cursor-not-allowed bg-gray-500" : ""
              }`}
            >
              {loading ? "Aguarde..." : "Cadastrar"}
            </button>
          </form>
        </>
      )}
    </AuthLayout>
  );
};

export default RegisterForm;
