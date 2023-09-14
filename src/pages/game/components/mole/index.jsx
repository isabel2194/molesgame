import React from "react";
import moleImage from "../../../../assets/mole.png";
import "./index.css";

const Mole = ({ visible }) => {
  return visible && <img className="mole_image" data-testid="mole_image" src={moleImage} />;
};

export default Mole;
