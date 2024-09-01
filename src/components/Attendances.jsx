import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AttendanceGrid from "../components/AttendanceGrid";
import MonthSelection from "../components/MonthSelection";
import { Button } from "@/components/ui/button";
import { FaArrowLeftLong } from "react-icons/fa6";

function Attendances() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayMonth, setDisplayMonth] = useState(selectedMonth);
  const [displayDate, setDisplayDate] = useState(selectedDate);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
    setSubjects(storedSubjects);
  }, []);

  const handleSearch = () => {
    setDisplayMonth(selectedMonth);
    setDisplayDate(selectedDate);
  };

  const handleBack = () => {
    setSelectedSubject(null);
  };

  return (
    <div className="p-10 ">
      <AnimatePresence>
        {!selectedSubject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-black text-2xl">
              <h1>Attendance Sheet</h1>
            </div>
            <hr
              className="mx-auto bg-[#0000003b] my-2 rounded-sm"
              style={{
                width: "100%",
                height: "1px",
                color: "white",
                borderWidth: 0,
              }}
            ></hr>
            {subjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                {subjects.map((subject, index) => (
                  <motion.div
                    key={index}
                    className=" bg-[#f7f7f7] p-10 rounded-lg shadow-lg cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSubject(subject)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-[#755485] text-white rounded-full flex items-center justify-center">
                        {subject.charAt(0)}
                      </div>
                      <div>
                        <h1 className="text-base text-[#333333]">{subject}</h1>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <h2>No subjects found</h2>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="attendance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-[#f7f7f7] p-5 rounded-lg">
              <div className="attendance-heading flex items-center ">
                <Button
                  onClick={handleBack}
                  className="  mr-5 rounded-full bg-transparent border border-gray-500 hover:bg-black hover:text-white text-black "
                >
                  <FaArrowLeftLong
                    style={{
                      padding: "5px",

                      fontSize: "25px",
                    }}
                  />
                </Button>
                <h2 className="text-2xl text-black py-10">{`${selectedSubject} Attendance Sheet`}</h2>
              </div>
              <hr
                className="mx-auto bg-[#0000003b] my-2 rounded-sm"
                style={{ width: "100%", height: "1px", borderWidth: 0 }}
              ></hr>
              <div className="flex gap-4 my-5 p-3 border rounded-lg">
                <MonthSelection
                  selectedMonth={(value) => setSelectedMonth(value)}
                  onSelectDate={(date) => setSelectedDate(date)}
                />
                <div className="search-button">
                  <Button onClick={handleSearch}>Search</Button>
                </div>
              </div>
              <div>
                <AttendanceGrid
                  selectedMonth={displayMonth}
                  selectedDate={displayDate}
                  selectedSubject={selectedSubject}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Attendances;
