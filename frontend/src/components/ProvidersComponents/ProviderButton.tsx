import React from "react";
import { ProviderButtonProps } from "../../interfaces/interfaces";

const ProviderButton: React.FC<ProviderButtonProps> = ({
  icon,
  label,
  url,
}) => (
  <button
    onClick={() => {
      window.location.href = url;
    }}
    className="flex items-center justify-center w-full px-4 py-2 text-black bg-gray-100 rounded-md hover:bg-gray-200"
  >
    {icon}
    <span className="ml-2">{label}</span>
  </button>
);

export default ProviderButton;
