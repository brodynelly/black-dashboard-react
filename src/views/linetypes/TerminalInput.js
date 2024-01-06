import React from "react";

const TerminalInput = ({ children, prompt = "$" }) => {
  return (
    <div
      className="react-terminal-line react-terminal-input"
      data-terminal-prompt={prompt}
    >
      {children}
    </div>
  );
};

export default TerminalInput;
