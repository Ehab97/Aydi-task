import React from "react";

interface IButton {
  onClick: () => void;
  className: string;
  title: string;
  Icon?: React.ReactElement;
}
const Button: React.FC<IButton> = ({ onClick, className, Icon, title }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-1 justify-center text-white py-2 px-4 rounded-full w-full sm:w-auto  mt-2 sm:mt-0 ${className}`}
    >
      {Icon && Icon}
      <span>{title}</span>
    </button>
  );
};

export default Button;
