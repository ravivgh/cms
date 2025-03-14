import React, { useState, useEffect } from "react";
import {
  Video,
  Calendar,
  Clock,
  Users,
  Copy,
  Check,
  Search,
  VideoOff,
  Book,
  Mic,
  MicOff,
  Crown,
  History,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const InitiateMeet = () => {
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [classSectionData, setClassSectionData] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
 // State for toggling history view
  const [showHistory, setShowHistory] = useState(false);

  // Mock data for previous meetings
  const previousMeetings = [
    {
      id: "M1",
      date: "2025-02-28",
      time: "14:00",
      duration: "45 min",
      class: "FYBCA",
      section: "A",
      subject: "Web Development",
      host: "Dr. Smith",
      participants: ["John Doe", "Mike Johnson"],
    },
    {
      id: "M2",
      date: "2025-02-27",
      time: "10:30",
      duration: "60 min",
      class: "SYBCA",
      section: "B",
      subject: "Database Management",
      host: "Prof. Johnson",
      participants: ["Sarah Williams", "Tom Brown"],
    },
  ];

  // Fetch class and section data
  useEffect(() => {
    const fetchClassSectionData = async () => {
      try {
        const response = await fetch("http://localhost:5472/services/getclassarray", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        console.log("Class and Section Data:", data); // Debugging

        // Ensure data is an array
        const classSectionArray = Array.isArray(data) ? data : [data];
        setClassSectionData(classSectionArray);
      } catch (error) {
        console.error("Error fetching class and section data:", error);
        setError("Failed to fetch class and section data");
      } finally {
        setLoading(false);
      }
    };

    fetchClassSectionData();
  }, []);

  // Update sections when a class is selected
  useEffect(() => {
    if (selectedClass) {
      const selectedClassData = classSectionData.find(
        (item) => item.Class === selectedClass
      );
      if (selectedClassData) {
        setSections(selectedClassData.Sections);
      } else {
        setSections([]);
      }
    } else {
      setSections([]);
    }
    setSelectedSection(""); // Reset section when class changes
    setSubjects([]); // Reset subjects when class changes
  }, [selectedClass, classSectionData]);

  // Update subjects when a section is selected
  useEffect(() => {
    if (selectedClass && selectedSection) {
      const selectedSectionData = sections.find(
        (section) => section.Section === selectedSection
      );
      if (selectedSectionData) {
        setSubjects(selectedSectionData.Subjects || []);
      } else {
        setSubjects([]);
      }
    } else {
      setSubjects([]);
    }
    setSelectedSubject(null); // Reset subject when section changes
  }, [selectedSection, sections]);

  const handleCopyMeetingId = () => {
    navigator.clipboard.writeText(meetingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleMic = () => {
    setIsMicOn((prev) => !prev);
  };

  const toggleVideo = () => {
    setIsVideoOn((prev) => !prev);
  };

  const handleStartMeeting = async () => {
    if (!selectedSubject) {
      alert("Please select a subject before starting the meeting.");
      return;
    }

    if (!selectedClass || !selectedSection) {
      alert("Please select both class and section before starting the meeting.");
      return;
    }

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const simpleTime = `${hours}:${minutes}`;

    const meetingData = {
      topic: meetingId,
      subject: selectedSubject,
      date: now.toISOString().split("T")[0],
      time: simpleTime,
      duration: 40,
      Class_id: selectedClass,
      section_id: selectedSection,
      college_id: parseInt(localStorage.getItem("college_id")),
    };

    try {
      const response = await fetch("http://localhost:5472/services/create-zoom-meeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(meetingData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Meeting created successfully!");
        console.log("Meeting Details:", data);
      } else {
        alert("Failed to create meeting: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error creating meeting:", error);
      alert("An error occurred while creating the meeting.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#333333] flex overflow-hidden ml-[5rem] transition-[margin] duration-300 expand-side:ml-[12.5rem]">
      {/* Left Panel */}
      <div className="w-2/5 h-screen border-r border-gray-800 overflow-y-auto">
        <div className="p-6">
          <div className="max-w-xl mx-auto space-y-6">
            <div className="bg-[#27282c] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Video className="w-5 h-5 mr-2 text-[#1d68bd]" />
                Camera Preview
              </h2>
              <div className="relative rounded-xl overflow-hidden bg-black aspect-video max-w-md mx-auto mb-6">
                <div className="absolute inset-0 flex items-center justify-center bg-[#1d1e20]">
                  <VideoOff className="w-12 h-12 text-gray-500" />
                </div>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={toggleMic}
                  className={`p-3 rounded-full transition-colors ${
                    isMicOn ? "bg-[#1d68bd]" : "bg-red-500"
                  }`}
                >
                  {isMicOn ? (
                    <Mic className="w-5 h-5 text-white" />
                  ) : (
                    <MicOff className="w-5 h-5 text-white" />
                  )}
                </button>
                <button
                  onClick={toggleVideo}
                  className={`p-3 rounded-full transition-colors ${
                    isVideoOn ? "bg-[#1d68bd]" : "bg-red-500"
                  }`}
                >
                  {isVideoOn ? (
                    <Video className="w-5 h-5 text-white" />
                  ) : (
                    <VideoOff className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-3/5 h-screen overflow-y-auto">
        <div className="p-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#27282c] rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-white">
                  {showHistory ? "Lecture History" : "Create E Lecture"}
                </h1>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="flex items-center text-white bg-[#1d68bd] hover:bg-blue-600 py-2 px-4 rounded-lg transition-colors"
                >
                  <History className="w-5 h-5 mr-2" />
                  {showHistory ? "Create E lecture?" : "View History"}
                </button>
              </div>

              {showHistory ? (
                  <div className="space-y-4">
                  {previousMeetings.length > 0 ? (
                    previousMeetings.map((meeting) => (
                      <div
                        key={meeting.id}
                        className="p-4 bg-[#1d1e20] rounded-lg"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-medium text-white">
                            {meeting.class} Section {meeting.section} -{" "}
                            {meeting.subject}
                          </h3>
                          <span className="text-sm text-gray-400">
                            {meeting.duration}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm text-gray-300">
                          <p>
                            <Calendar className="inline w-4 h-4 mr-2" />
                            Date: {meeting.date}
                          </p>
                          <p>
                            <Clock className="inline w-4 h-4 mr-2" />
                            Time: {meeting.time}
                          </p>
                          <p>
                            <Crown className="inline w-4 h-4 mr-2" />
                            Host: {meeting.host}
                          </p>
                          <p>
                            <Users className="inline w-4 h-4 mr-2" />
                            Participants: {meeting.participants.join(", ")}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-400">
                      No previous meetings found
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-4 p-4 bg-[#1d1e20] rounded-lg mb-6">
                    <div className="flex-grow">
                      <p className="text-sm text-gray-400 mb-1">Meeting ID</p>
                      <input
                        type="text"
                        value={meetingId}
                        onChange={(e) => setMeetingId(e.target.value)}
                        className="bg-transparent text-white border-none outline-none w-full"
                        placeholder="Enter Meeting ID"
                      />
                    </div>
                    <button
                      onClick={handleCopyMeetingId}
                      className="p-2 hover:bg-[#27282c] rounded-lg transition-colors"
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Class and Section Selection */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-6">
                      Select Class and Section
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-2">
                          Select Class
                        </h3>
                        <Select
                          onValueChange={(value) => setSelectedClass(value)}
                        >
                          <SelectTrigger className="w-full bg-[#27282c] border-0">
                            <SelectValue placeholder="Select Class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {classSectionData.map((item) => (
                                <SelectItem key={item.Class} value={item.Class}>
                                  {item.Class}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-2">
                          Select Section
                        </h3>
                        <Select
                          onValueChange={(value) => setSelectedSection(value)}
                          disabled={!selectedClass}
                        >
                          <SelectTrigger className="w-full bg-[#27282c] border-0">
                            <SelectValue placeholder="Select Section" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {sections.map((section) => (
                                <SelectItem key={section.Section} value={section.Section}>
                                  {section.Section}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Subject Selection */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                      <Book className="w-5 h-5 mr-2 text-[#1d68bd]" />
                      Select Subject
                    </h2>
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search subjects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-[#27282c] text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d68bd]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {subjects
                        .filter((subject) =>
                          subject.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((subject) => (
                          <div
                            key={subject}
                            onClick={() => setSelectedSubject(subject)}
                            className={`group flex items-center p-4 rounded-xl cursor-pointer transition-all ${
                              selectedSubject === subject
                                ? "bg-[#1d68bd]/20 border border-[#1d68bd]"
                                : "bg-[#27282c] hover:bg-[#2d2e32] border border-transparent"
                            }`}
                          >
                            <div className="flex items-center space-x-4 flex-1">
                              <div
                                className={`
                                  w-12 h-12 rounded-lg flex items-center justify-center text-2xl
                                  ${
                                    selectedSubject === subject
                                      ? "bg-[#1d68bd]/30"
                                      : "bg-[#2d2e32] group-hover:bg-[#3d3e42]"
                                  }
                                  transition-colors
                                `}
                              >
                                📚
                              </div>
                              <div>
                                <h3 className="font-medium text-white text-sm">{subject}</h3>
                              </div>
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ml-2 transition-all ${
                                selectedSubject === subject
                                  ? "border-[#1d68bd] bg-[#1d68bd]"
                                  : "border-gray-500"
                              }`}
                            >
                              {selectedSubject === subject && (
                                <Check className="w-3 h-3 text-white" />
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Start Meeting Button */}
                  <div className="sticky bottom-0 pt-6">
                    <div className="bg-[#27282c] p-6 rounded-b-xl -mx-6 -mb-6 border-t border-gray-800">
                      <button
                        onClick={handleStartMeeting}
                        className={`block text-center ${
                          !selectedSubject
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-[#1d68bd] hover:bg-blue-600"
                        } text-white py-4 px-6 rounded-lg transition-colors text-lg font-medium`}
                        disabled={!selectedSubject}
                      >
                        Start Meeting
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitiateMeet;