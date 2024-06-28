import React from 'react';

// Button component with optional props for text, icon, onClick handler, and link
const Button = ({ text, icon, onClick, link }) => {
  return (
    
    <a
      href={link}
      onClick={onClick}
      className="br text-white px-4 py-3 flex transform hover:scale-105 transition-transform duration-300 border-gradient bg-opacity-50 backdrop-filter backdrop-blur-lg items-center justify-between text-center space-x-2 "
    >
        <p className=" items-center justify-center text-center flex">

      {text}
        </p>
        <p className=" items-center justify-center text-center flex">

      {icon && <span className="mr-2">{icon}</span>}
        </p>
    </a>
  );
};

export default Button;
