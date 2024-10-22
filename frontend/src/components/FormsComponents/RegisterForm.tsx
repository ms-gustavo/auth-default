import { useState } from "react";
import { FormProps } from "../../interfaces/interfaces";
import AuthLayout from "../AuthComponents/AuthLayout";
import InputField from "../InputField";
import { handleApiError } from "../../utils/errorHandler";
import { serverRequests } from "../../utils/serverRequests";

const RegisterForm: React.FC<FormProps> = ({ onSwitch }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { registerRequest } = serverRequests();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await registerRequest(name, email, password);
      setName("");
      setEmail("");
      setPassword("");
      setSuccessMessage(response.data.message);
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
        <p className="text-green-500 text-center">{successMessage}</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            {error && <p className="text-red-500">{error}</p>}
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
