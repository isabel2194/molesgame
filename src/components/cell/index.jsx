import React from "react";

const Cell = ({ className, children, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export default Cell;
