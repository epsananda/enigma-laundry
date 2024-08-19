import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";

const ButtonPrimary = ({ text, className, to, children, onClick, type = "button", ...props }) => {
  return (
    <Link to={to}>
      <Button
        onClick={onClick}
        type={type}
        className={`bg-[#8c7851] text-white mb-4
    hover:bg-white hover:text-[#8c7851] hover:border hover:border-[#8c7851]
    ${className}`}
        {...props}
      >
        {children}
        {text}
      </Button>
    </Link>
  );
};

export default ButtonPrimary;
