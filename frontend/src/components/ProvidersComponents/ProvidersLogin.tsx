import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { apiEndpoints } from "../../utils/apiEndpoints";
import ProviderButton from "./ProviderButton";

const ProvidersLogin: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-auto">
      <div className="w-full max-w-md p-8 space-y-6">
        <ProviderButton
          icon={<FcGoogle />}
          label="Entrar com Google"
          url={apiEndpoints.googleLogin}
        />
        <ProviderButton
          icon={<FaGithub />}
          label="Entrar com GitHub"
          url={apiEndpoints.githubLogin}
        />
      </div>
    </div>
  );
};

export default ProvidersLogin;
