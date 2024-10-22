import React from "react";
import SapiensSVG from "../assets/sapiens.svg";

const ImageAuthComponent: React.FC = () => {
  return (
    <div className="hidden md:flex md:w-1/2 h-full items-center justify-center bg-gray-200">
      <img src={SapiensSVG} alt="Sapiens" className="w-3/4 h-3/4" />
    </div>
  );
};

export default ImageAuthComponent;
