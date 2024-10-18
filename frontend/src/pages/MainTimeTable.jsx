import FacultyNotEdit from "@/components/FacultyNotEdit";
import StudentSidebar from "@/components/StudentSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import SessionRedirect from "@/scripts/checksession.mjs";

const TimeTable = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [timetable, setTimetable] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const numPeriods = 4;
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const fetchSubjects = async () => {
    const studentId = localStorage.getItem("student_id");

    if (studentId) {
      try {
        const response = await axios.post(
          "http://localhost:5472/services/getsubjectsbysid",
          { sid: parseInt(studentId) }
        );
        const subjectList = response.data.subjectList || [];
        setSubjects(subjectList);
      } catch (error) {
        console.error("Error fetching subjects:", error);
        setSubjects([]);
      }
    } else {
      console.error("student_id not found in sessionStorage");
    }
  };

  const populateTimetable = () => {
    if (subjects.length === 0) return;

    const newTimetable = days.map((day) => {
      const shuffledSubjects = shuffleArray([...subjects]);

      // Ensure that all periods are filled, repeating subjects if necessary
      const periods = Array.from({ length: numPeriods }, (_, index) => {
        return shuffledSubjects[index % shuffledSubjects.length];
      });

      return {
        day,
        periods,
      };
    });

    setTimetable(newTimetable);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (subjects.length > 0) {
      populateTimetable();
    }
  }, [subjects]);

  return (
    <>
      <SessionRedirect />
      <div className="flex">
        <StudentSidebar
          isSidebarOpen={isSidebarOpen}
          onToggle={handleSidebarToggle}
        />
        <main
          className={`p-4 transition-all duration-500 ${
            isSidebarOpen ? "ml-[12.5rem]" : "ml-[5rem]"
          }`}
          style={{
            width: isSidebarOpen ? "calc(100% - 12.5rem)" : "calc(100% - 5rem)",
          }}
        >
          <div className="bg-[#f7f7f7] p-5 rounded-lg">
            <h1 className="text-black py-10 text-2xl text-center">
              Time Table
            </h1>
            <hr
              className="mx-auto bg-[#0000003b] my-2 rounded-sm"
              style={{
                width: "100%",
                height: "1px",
                color: "white",
                borderWidth: 0,
              }}
            />

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2 text-black font-bold text-center">
                      Days
                    </th>
                    <th className="border border-gray-300 p-2 text-black font-bold text-center">
                      Period 1
                    </th>
                    <th className="border border-gray-300 p-2 text-black font-bold text-center">
                      Period 2
                    </th>
                    <th className="border border-gray-300 p-2 text-black font-bold text-center">
                      Period 3
                    </th>
                    <th className="border border-gray-300 p-2 text-black font-bold text-center">
                      Period 4
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {timetable.map((entry) => (
                    <tr key={entry.day} className="hover:bg-gray-100">
                      <td className="border border-gray-300 p-2 text-black text-center">
                        {entry.day}
                      </td>
                      {entry.periods.map((subject, index) => (
                        <td
                          key={index}
                          className="border border-gray-300 p-2 text-black text-center"
                        >
                          {subject}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TimeTable;
