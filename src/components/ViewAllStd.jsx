import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Students from "@/components/Students";
import StudentList from "../components/StudentList";
import SmartCard from "@/components/SmartCard";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
const ViewAllStd = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const people = [
    {
      id: 1,
      name: "Rahul Arora",
      image:
        "https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/0f6fee60-187e-44ed-8ccf-e0bc3b56eeac.jpg",
      checked: true,
    },
    {
      id: 2,
      name: "John Doe",
      image:
        "https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/bb34b3a9-006d-4b7e-b885-8cd040cd60b5.jpg",
      checked: true,
    },
    {
      id: 3,
      name: "Kunal Shah",
      image:
        "https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/a7e93f4c-d40c-4598-9728-cf71c93a1ee6.jpg",
      checked: true,
    },
    {
      id: 4,
      name: "Sara Smith",
      image:
        "https://intervue-static.s3-us-west-2.amazonaws.com/production/7074/dfcf42ef-bc4a-4c27-bb6a-9c5765fbb09b.png",
      checked: true,
    },
    {
      id: 5,
      name: "Bread Smith",
      image:
        "https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/85a037d1-d6a3-468b-b66d-e2d0d92bc3ad.jpg",
      checked: true,
    },
    {
      id: 6,
      name: "Rajiv Deep",
      image:
        "https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/354556a6-464e-477a-a95d-cf791f5ce652.jpg",
      checked: true,
    },
    {
      id: 7,
      name: "Deep Shah",
      image:
        "https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/5fa1f3f4-f66c-44d8-a814-fd08ee85beca.jpg",
      checked: true,
    },
  ];

  const [peopleData, setPeopleData] = useState(people);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectAll, setSelectAll] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const assignments = ["Assignment 1", "Assignment 2", "Assignment 3"];
  const [search, setSearch] = useState("");
  const filteredAssignments = assignments.filter((assignment) =>
    assignment.toLowerCase().includes(search.toLowerCase())
  );
  // Handle checkbox toggle for individual person
  const handleCheckboxChange = (id) => {
    setPeopleData((prevState) =>
      prevState.map((person) =>
        person.id === id ? { ...person, checked: !person.checked } : person
      )
    );
    setSelectAll(false); // Deselect "Select All" if any individual is toggled
  };

  // Handle "Select All" button
  const handleSelectAll = () => {
    const allSelected = !selectAll;
    setSelectAll(allSelected);
    setPeopleData((prevState) =>
      prevState.map((person) => ({ ...person, checked: allSelected }))
    );
  };

  // Filter people by search query
  const filteredPeople = peopleData.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="flex">
      <Sidebar isSidebarOpen={isSidebarOpen} onToggle={handleSidebarToggle} />
      <main
        className={` transition-all duration-500 ${
          isSidebarOpen ? "ml-[12.5rem]" : "ml-[5rem]"
        }`}
        style={{
          width: isSidebarOpen ? "calc(100% - 12.5rem)" : "calc(100% - 5rem)",
        }}
      >
        {/* <SmartCard /> */}

        <div className="bg-[#2b2b2b] w-full h-screen flex ">
          {/* Left Section */}
          <div className="flex justify-center items-center w-full lg:w-[50%] h-[50%] lg:h-full p-5">
            <div className="bg-white w-full max-w-md h-[400px] p-5 rounded-lg shadow-md ">
              <h1 className="text-black text-xl md:text-2xl font-medium">
                Select a quiz to monitor student attempts
              </h1>
              <div className="space-y-4">
                {/* Search Input */}
                <div className="space-y-2 pt-5">
                  <div className="relative">
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="peer pe-10 ps-9 py-6 px-4 bg-[#e5e5e5] text-black w-full rounded-full"
                      placeholder="Search"
                      type="search"
                    />
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                      <Search size={16} strokeWidth={2} />
                    </div>
                  </div>
                </div>
                {/* Assignment List */}
                <div className="space-y-2">
                  {filteredAssignments.length > 0 ? (
                    filteredAssignments.map((assignment) => (
                      <div
                        key={assignment}
                        onClick={() => setSelectedAssignment(assignment)}
                        className={`cursor-pointer bg-[#ffffff] w-full p-5 rounded-md ${
                          selectedAssignment === assignment
                            ? " bg-[#e4e4e4]"
                            : "border"
                        }`}
                      >
                        <h1 className="text-black font-medium ">
                          {assignment}{" "}
                        </h1>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No assignments found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <svg
            aria-hidden="true"
            className="pointer-events-none h-[450px] w-full fill-gray-400/30 stroke-gray-400/30 opacity-40 hidden lg:block absolute inset-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
          >
            <defs>
              <pattern
                id="patternRhflb"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
                x="-1"
                y="-1"
              >
                <path d="M.5 60V.5H60" fill="none" strokeDasharray="0 0"></path>
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              strokeWidth="0"
              fill="url(#patternRhflb)"
            ></rect>
          </svg>
          <div className="bg-[#333333] flex-1 mx-5 my-20 flex flex-col relative">
            {/* Header Section */}
            <div className="from-[#3b3c3f] via-[#116752]  to-[#1d68bd]  bg-gradient-to-t w-full p-5 rounded-t-xl">
              <h1 className="text-base text-[#ffffff]">Assignment 1</h1>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <p className="text-gray-300 text-sm">
                  <span>20</span> Students
                </p>
              </div>
            </div>

            {/* Search Section */}
            <div className="flex items-center gap-5 bg-[#202020] p-5 shadow-2xl border-b-[1px] border-gray-700">
              <Button
                onClick={handleSelectAll}
                className="bg-[#2b2b2b] border border-gray-500 rounded-full hover:bg-[#2b2b2b]"
              >
                {selectAll ? "Deselect All" : " All Students"}
              </Button>
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="peer pe-9 ps-9 bg-[#2a2a2a] text-white w-96 rounded-full border border-gray-500"
                    placeholder="Search"
                    type="search"
                  />
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50 text-[#a0a0a0]">
                    <Search size={16} strokeWidth={2} />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="flex-grow bg-[#222222] p-5 overflow-auto ">
              {filteredPeople.length > 0 ? (
                <motion.div
                  className="flex flex-wrap gap-5  items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    staggerChildren: 0.2,
                  }}
                >
                  {filteredPeople.map((person) => (
                    <motion.div
                      key={person.id}
                      className=""
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div key={person.id} className="relative space-y-3 mt-5">
                        <Avatar className="w-24 h-24 rounded-lg">
                          <AvatarImage src={person.image} />
                        </Avatar>
                        <h1 className="text-sm text-white">{person.name}</h1>

                        <div className="absolute -top-4 left-20">
                          <Checkbox
                            checked={person.checked}
                            onCheckedChange={() =>
                              handleCheckboxChange(person.id)
                            }
                            className="rounded-full data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <p className="text-white">No results found</p>
              )}
            </div>

            {/* Fixed View All Section */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#333333] via-[#292929] to-transparent p-20">
              <div className="flex items-center justify-center space-x-2 cursor-pointer">
                <h1
                  className="text-lg font-semibold text-white border-b-[1px] border-b-slate-200"
                  onClick={() => navigate("/attendances/viewall/all")}
                >
                  View All
                </h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="10"
                  viewBox="0 0 18 12"
                  fill="none"
                  transform="rotate(-45)"
                >
                  <path
                    d="M1 6H17M17 6L12 1M17 6L12 11"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* <h1 className="text-black font-medium text-xl">Attempted Students</h1>
        <StudentList /> */}
      </main>
    </div>
  );
};

export default ViewAllStd;
