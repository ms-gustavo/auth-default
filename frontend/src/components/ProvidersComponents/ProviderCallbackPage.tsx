import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const ProviderCallbackPage: React.FC = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getTokenFromUrl = () => {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get("token");
      if (token) {
        login(token);
        navigate("/protected");
      }
    };

    getTokenFromUrl();
  }, [login, navigate]);

  return (
    <div>
      <h2>Autenticando...</h2>
    </div>
  );
};

export default ProviderCallbackPage;
