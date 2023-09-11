import React from "react";
import cn from "classnames";
import moleImage from "../../../../assets/mole.png";
import "./index.css";

const Mole = ({ visible }) => {
  return visible && <img className={cn("mole_image", { showing: visible })} src={moleImage} />;
};

export default Mole;
