import React from "react";
import AddFaculty from "./AddFaculty";
import SessionRedirect from "@/scripts/checksession.mjs";

const Facultys = () => {
  return (
    <>
      <div className="bg-[#f7f7f7] p-5 rounded-lg">
        <h1 className="text-black py-10 text-2xl">Faculty Details</h1>
        <hr
          className="mx-auto bg-[#0000003b] my-2 rounded-sm"
          style={{
            width: "100%",
            height: "1px",
            color: "white",
            borderWidth: 0,
          }}
        ></hr>
        <div className="">
          <AddFaculty />
        </div>
      </div>
    </>
  );
};

export default Facultys;
