import React from "react";
import "./MainCard.css";

const MainCard = (props) => {
  return (
    <div className={"main-card " + props.className}>
      <img
        src="https://www.bullcoin.io/wp-content/uploads/2022/03/robo1.svg"
        className="robo1 skip-lazy"
        alt="robot"
      />
      <img
        src="https://www.bullcoin.io/wp-content/uploads/2022/03/robo2.svg"
        className="robo2 skip-lazy"
        alt="robot"
      />
      {props.children}
    </div>
  );
};

export default MainCard;
