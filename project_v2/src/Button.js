import React, { useState } from 'react';

function Button() {
  const [buttonText, setButtonText] = useState("Click me");

  const handleClick = () => {
    setButtonText("Clicked!");
    setTimeout(() => {
      setButtonText("Click me");
    }, 2000); 
  };

  return (
    <button onClick={handleClick}>
      {buttonText}
    </button>
  );
}

export default Button;