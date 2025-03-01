import React, { useContext } from "react";
import GlobalContext from "@/context/GlobalContext";
import { Checkbox } from "@mui/material";

export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);

  return (
    <React.Fragment>
      <p className="text-gray-500 mt-10">Label</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className="items-center  block">
          <Checkbox
            checked={checked}
            onChange={() => updateLabel({ label: lbl, checked: !checked })}
            sx={{
              transform: "scale(0.7)",
              color: `${lbl}`,
              "&.Mui-checked": {
                color: `${lbl}`,
              },
            }}
          />
          <span className=" text-gray-700 capitalize">{lbl}</span>
        </label>
      ))}
    </React.Fragment>
  );
}
