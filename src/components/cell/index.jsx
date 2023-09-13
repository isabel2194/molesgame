import React from "react";
import cn from "classnames";
import "./index.css";

const Cell = ({ className, testId, children, onClick }) => {
  return (
    <div className={cn("cell", className)} onClick={onClick} data-testid={testId}>
      {children}
    </div>
  );
};

export default Cell;
