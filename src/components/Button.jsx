import React from "react";

const Button = ({ children, handleClick }) => {
  return (
    <button className="border-2 rounded-md p-2 bg-amber-100" onClick={handleClick ? handleClick : null}>
      {children}
    </button>
  );
};

export default Button;
