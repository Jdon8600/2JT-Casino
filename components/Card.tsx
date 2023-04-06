import React from "react";
import classes from "./card.module.css"

const Card = ({cvalue, csuit}: {cvalue:string, csuit:string}) => {
    const combo = `${cvalue}${csuit}`;
    const color = (csuit === '♥' || csuit === '♦')? "redCard" : "card";
    return (
        <div className={classes[color]}>
            {combo}
        </div>
    )
}

export default Card;