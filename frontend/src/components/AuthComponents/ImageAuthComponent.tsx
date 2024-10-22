import React from "react";
import SapiensSVG from "../../assets/sapiens.svg";

const ImageAuthComponent: React.FC = () => {
  return (
    <div className="hidden md:flex md:flex-col md:w-1/2 h-full items-center justify-center p-6 bg-gray-50">
      <div className="text-center mb-4 max-w-lg">
        <h1 className="text-2xl xl:text-4xl font-bold text-gray-700 mb-2">
          Bem-vindo ao Auth-Default
        </h1>
        <p className="text-gray-600 text-sm md:text-xl">
          Um projeto de autenticação completo com Node.js e TypeScript, que
          inclui registro, verificação de e-mails e suporte a OAuth2 com Google
          e GitHub.
        </p>
      </div>
      <img src={SapiensSVG} alt="Sapiens" className="w-4/5 max-w-md h-auto" />
    </div>
  );
};

export default ImageAuthComponent;
