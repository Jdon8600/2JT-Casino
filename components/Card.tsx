import React from "react";
import classes from "./card.module.css";

const Card = ({
  cvalue,
  csuit,
}: {
  cvalue: string | number;
  csuit: string;
}) => {
  const combo = cvalue ? `${cvalue}${csuit}` : null;
  const color = csuit === "♥" || csuit === "♦" ? "redCard" : "card";
  return (
    <td>
      <div className={classes[color]}>{combo}</div>
    </td>
  );
};

export default Card;
