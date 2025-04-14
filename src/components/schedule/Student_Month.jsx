/* eslint-disable react/prop-types */
import React from "react";
import StudentDay from "../schedule/StudentDay" 
export default function Month({ month }) {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5 text-black">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <StudentDay day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
