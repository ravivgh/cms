import GlobalContext from "@/context/GlobalContext";
import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";

import { MdArrowDropDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, Button } from "@mui/material";
export default function CreateEventButtonStudent() {
  const { setShowEventModal } = useContext(GlobalContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Open dropdown
  };

  const handleClose = (option) => {
    setAnchorEl(null); // Close dropdown
    if (option === "Appointment") {
      navigate("/collegemaster-student/settings/appointment");
    }
  };
  return (
    <>
      <button
        onClick={handleClick}
        className=" p-2 rounded-full flex items-center  hover:shadow-2xl bg-[#555555] gap-2 px-5"
      >
        <FaPlus className="text-white w-5 h-5" />

        <span className=" text-white"> Create</span>
        <MdArrowDropDown />
      </button>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {["Appointment"].map((item) => (
          <MenuItem key={item} onClick={() => handleClose(item)}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
