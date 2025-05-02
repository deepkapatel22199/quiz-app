import React from "react";
import "./Ladder.css";

const Ladder = ({ current, prizeMoney }) => {
  return (
    <ul className="ladder">
      {prizeMoney
        .slice()
        .reverse()
        .map((amount, idx) => {
          const qNum = prizeMoney.length - 1 - idx;
          const active = current === qNum + 1;

          return (
            <li key={qNum} className={active ? "ladder-item active" : "ladder-item"}>
              <span>Q{qNum + 1}</span> ₹{amount}
            </li>
          );
        })}
    </ul>
  );
};

export default Ladder;
