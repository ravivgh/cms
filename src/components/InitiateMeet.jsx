import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Video,
  Calendar,
  Clock,
  Users,
  Copy,
  Check,
  Search,
  VideoOff,
  Shield,
  Crown,
  Book,
  Mic,
  MicOff,
  Settings,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const InitiateMeet = () => {
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const meetingId = "meet-123-456-789";

  const students = [
    {
      id: 1,
      name: "John Doe",
      class: "FYBCA",
      avatar: "https://avatars.githubusercontent.com/u/1?v=4",
      status: "online",
    },
    {
      id: 2,
      name: "Jane Smith",
      class: "SYBCA",
      avatar: "https://avatars.githubusercontent.com/u/2?v=4",
      status: "offline",
    },
    {
      id: 3,
      name: "Mike Johnson",
      class: "TYBCA",
      avatar: "https://avatars.githubusercontent.com/u/3?v=4",
      status: "online",
    },
  ];

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedHost, setSelectedHost] = useState(null);
  const isAdmin = true; // This should come from your auth context/state

  // Mock faculty data - replace with your actual data
  const facultyList = [
    {
      id: "F1",
      name: "Dr. Smith",
      department: "Computer Science",
      avatar: "https://avatars.githubusercontent.com/u/4?v=4",
    },
    {
      id: "F2",
      name: "Prof. Johnson",
      department: "Information Technology",
      avatar: "https://avatars.githubusercontent.com/u/5?v=4",
    },
  ];

  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjects = [
    {
      id: "SUB1",
      name: "Web Development",
      code: "WD101",
      icon: "💻",
    },
    {
      id: "SUB2",
      name: "Database Management",
      code: "DB201",
      icon: "🗄️",
    },
    {
      id: "SUB3",
      name: "Data Structures",
      code: "DS301",
      icon: "🌳",
    },
    {
      id: "SUB4",
      name: "Computer Networks",
      code: "CN401",
      icon: "🌐",
    },
  ];

  const [hostSearchTerm, setHostSearchTerm] = useState("");
  const [subjectSearchTerm, setSubjectSearchTerm] = useState("");

  const filteredFaculty = facultyList.filter(
    (faculty) =>
      faculty.name.toLowerCase().includes(hostSearchTerm.toLowerCase()) ||
      faculty.department.toLowerCase().includes(hostSearchTerm.toLowerCase())
  );

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(subjectSearchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(subjectSearchTerm.toLowerCase())
  );

  const handleCopyMeetingId = () => {
    navigator.clipboard.writeText(meetingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleStudentSelection = (student) => {
    setSelectedStudents((prev) =>
      prev.includes(student.id)
        ? prev.filter((id) => id !== student.id)
        : [...prev, student.id]
    );
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0);
  const videoRef = useRef(null);
  const audioContextRef = useRef(null);
  const streamRef = useRef(null);

  const startVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      initAudioMeter();
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  const stopVideoStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  const initAudioMeter = () => {
    if (!streamRef.current) return;

    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    const source = audioContextRef.current.createMediaStreamSource(
      streamRef.current
    );
    const analyser = audioContextRef.current.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const updateAudioLevel = () => {
      if (!audioContextRef.current) return;
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      setAudioLevel(average);
      requestAnimationFrame(updateAudioLevel);
    };

    updateAudioLevel();
  };

  const toggleMic = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    }
  };

  useEffect(() => {
    startVideoStream();
    return () => {
      stopVideoStream();
    };
  }, []);

  const TestDevicesModal = () => (
    <Dialog
      open={isTestModalOpen}
      onOpenChange={(open) => {
        setIsTestModalOpen(open);
        if (open) {
          startVideoStream();
        } else {
          stopVideoStream();
        }
      }}
    >
      <DialogContent className="bg-[#27282c] border-0 text-white max-w-5xl p-0 gap-0">
        <div className="grid grid-cols-5">
          {/* Video Preview Section - Takes 3/5 of the space */}
          <div className="col-span-3 p-6 border-r border-gray-800">
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold flex items-center">
                  <Video className="w-5 h-5 mr-2 text-[#1d68bd]" />
                  Camera Preview
                </DialogTitle>
              </DialogHeader>

              <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted={!isMicOn}
                  className="w-full h-full object-cover"
                />
                {!isVideoOn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1d1e20]">
                    <VideoOff className="w-16 h-16 text-gray-500" />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={toggleMic}
                  className={`p-4 rounded-full transition-colors ${
                    isMicOn ? "bg-[#1d68bd]" : "bg-red-500"
                  }`}
                >
                  {isMicOn ? (
                    <Mic className="w-6 h-6 text-white" />
                  ) : (
                    <MicOff className="w-6 h-6 text-white" />
                  )}
                </button>
                <button
                  onClick={toggleVideo}
                  className={`p-4 rounded-full transition-colors ${
                    isVideoOn ? "bg-[#1d68bd]" : "bg-red-500"
                  }`}
                >
                  {isVideoOn ? (
                    <Video className="w-6 h-6 text-white" />
                  ) : (
                    <VideoOff className="w-6 h-6 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Settings Section - Takes 2/5 of the space */}
          <div className="col-span-2 p-6 bg-[#1d1e20]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold flex items-center">
                <Settings className="w-5 h-5 mr-2 text-[#1d68bd]" />
                Device Settings
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 mt-6">
              {/* Microphone Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-300">
                  Microphone
                </h3>
                <Select>
                  <SelectTrigger className="w-full bg-[#27282c] border-0">
                    <SelectValue placeholder="Select microphone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Available Microphones</SelectLabel>
                      <SelectItem value="default">
                        Default Microphone
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {isMicOn && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Input Level</span>
                      <span>{Math.round((audioLevel / 255) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-[#27282c] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1d68bd] transition-all duration-100"
                        style={{ width: `${(audioLevel / 255) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Camera Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-300">Camera</h3>
                <Select>
                  <SelectTrigger className="w-full bg-[#27282c] border-0">
                    <SelectValue placeholder="Select camera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Available Cameras</SelectLabel>
                      <SelectItem value="default">Default Camera</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Speaker Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-300">Speaker</h3>
                <Select>
                  <SelectTrigger className="w-full bg-[#27282c] border-0">
                    <SelectValue placeholder="Select speaker" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Available Speakers</SelectLabel>
                      <SelectItem value="default">Default Speaker</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Connection Status */}
              <div className="p-4 bg-[#27282c] rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm text-gray-300">
                    Connection Status: Good
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-[#333333] flex overflow-hidden ml-[5rem] transition-[margin] duration-300 expand-side:ml-[12.5rem]">
      {/* Left Section - Video Preview */}
      <div className="w-2/5 h-screen border-r border-gray-800 overflow-y-auto">
        <div className="p-6">
          <div className="max-w-xl mx-auto space-y-6">
            {/* Video Preview Card */}
            <div className="bg-[#27282c] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Video className="w-5 h-5 mr-2 text-[#1d68bd]" />
                Camera Preview
              </h2>

              {/* Video Container with reduced size */}
              <div className="relative rounded-xl overflow-hidden bg-black aspect-video max-w-md mx-auto mb-6">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted={!isMicOn}
                  className="w-full h-full object-cover"
                />
                {!isVideoOn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1d1e20]">
                    <VideoOff className="w-12 h-12 text-gray-500" />
                  </div>
                )}
              </div>

              {/* Quick Controls */}
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

            {/* Device Settings Card */}
            <div className="bg-[#27282c] rounded-xl p-6 space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-[#1d68bd]" />
                Device Settings
              </h2>

              {/* Camera Settings */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-400">Camera</h3>
                <Select>
                  <SelectTrigger className="w-full bg-[#1d1e20] border-0">
                    <SelectValue placeholder="Select camera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Available Cameras</SelectLabel>
                      <SelectItem value="default">Default Camera</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Microphone Settings */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-400">
                  Microphone
                </h3>
                <Select>
                  <SelectTrigger className="w-full bg-[#1d1e20] border-0">
                    <SelectValue placeholder="Select microphone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Available Microphones</SelectLabel>
                      <SelectItem value="default">
                        Default Microphone
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {isMicOn && (
                  <div className="flex items-center space-x-2 bg-[#1d1e20] p-2 rounded-lg">
                    <div className="flex-grow">
                      <div className="h-1.5 bg-[#27282c] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#1d68bd] transition-all duration-100"
                          style={{ width: `${(audioLevel / 255) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 min-w-[40px] text-right">
                      {Math.round((audioLevel / 255) * 100)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Meeting Setup */}
      <div className="w-3/5 h-screen overflow-y-auto">
        <div className="p-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#27282c] rounded-xl p-6 mb-6">
              <h1 className="text-2xl font-semibold text-white mb-6">
                Join Meeting
              </h1>

              {/* Meeting ID Section */}
              <div className="flex items-center space-x-4 p-4 bg-[#1d1e20] rounded-lg mb-6">
                <div className="flex-grow">
                  <p className="text-sm text-gray-400 mb-1">Meeting ID</p>
                  <code className="text-white">{meetingId}</code>
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

              {/* Existing meeting setup sections */}
              {isAdmin && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Crown className="w-5 h-5 mr-2 text-[#1d68bd]" />
                    Select Host
                  </h2>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search hosts..."
                      value={hostSearchTerm}
                      onChange={(e) => setHostSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-[#27282c] text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d68bd]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {filteredFaculty.length > 0 ? (
                      filteredFaculty.map((faculty) => (
                        <div
                          key={faculty.id}
                          onClick={() => setSelectedHost(faculty.id)}
                          className={`flex items-center p-4 rounded-xl cursor-pointer transition-all ${
                            selectedHost === faculty.id
                              ? "bg-[#1d68bd]/20 border border-[#1d68bd]"
                              : "bg-[#27282c] hover:bg-[#2d2e32] border border-transparent"
                          }`}
                        >
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="relative">
                              <img
                                src={faculty.avatar}
                                alt={faculty.name}
                                className="w-12 h-12 rounded-full border-2 border-gray-700"
                              />
                              {selectedHost === faculty.id && (
                                <div className="absolute -top-1 -right-1 bg-[#1d68bd] rounded-full p-1">
                                  <Crown className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium text-white text-sm">
                                {faculty.name}
                              </h3>
                              <div className="flex items-center mt-1">
                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                                <p className="text-xs text-gray-400">
                                  {faculty.department}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ml-2 transition-all ${
                              selectedHost === faculty.id
                                ? "border-[#1d68bd] bg-[#1d68bd]"
                                : "border-gray-500"
                            }`}
                          >
                            {selectedHost === faculty.id && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-4 text-gray-400">
                        No hosts found matching "{hostSearchTerm}"
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Book className="w-5 h-5 mr-2 text-[#1d68bd]" />
                  Select Subject
                </h2>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search subjects by name or code..."
                    value={subjectSearchTerm}
                    onChange={(e) => setSubjectSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#27282c] text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d68bd]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {filteredSubjects.length > 0 ? (
                    filteredSubjects.map((subject) => (
                      <div
                        key={subject.id}
                        onClick={() => setSelectedSubject(subject.id)}
                        className={`group flex items-center p-4 rounded-xl cursor-pointer transition-all ${
                          selectedSubject === subject.id
                            ? "bg-[#1d68bd]/20 border border-[#1d68bd]"
                            : "bg-[#27282c] hover:bg-[#2d2e32] border border-transparent"
                        }`}
                      >
                        <div className="flex items-center space-x-4 flex-1">
                          <div
                            className={`
                            w-12 h-12 rounded-lg flex items-center justify-center text-2xl
                            ${
                              selectedSubject === subject.id
                                ? "bg-[#1d68bd]/30"
                                : "bg-[#2d2e32] group-hover:bg-[#3d3e42]"
                            }
                            transition-colors
                          `}
                          >
                            {subject.icon}
                          </div>
                          <div>
                            <h3 className="font-medium text-white text-sm">
                              {subject.name}
                            </h3>
                            <div className="flex items-center mt-1">
                              <p className="text-xs text-gray-400">
                                {subject.code}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ml-2 transition-all ${
                            selectedSubject === subject.id
                              ? "border-[#1d68bd] bg-[#1d68bd]"
                              : "border-gray-500"
                          }`}
                        >
                          {selectedSubject === subject.id && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-4 text-gray-400">
                      No subjects found matching "{subjectSearchTerm}"
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-6">
                  Select Students
                </h2>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#27282c] text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d68bd]"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      onClick={() => toggleStudentSelection(student)}
                      className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                        selectedStudents.includes(student.id)
                          ? "bg-[#1d68bd]/20 border-[#1d68bd]"
                          : "bg-[#27282c] hover:bg-[#2d2e32]"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div
                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#27282c] ${
                              student.status === "online"
                                ? "bg-green-500"
                                : "bg-gray-400"
                            }`}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">
                            {student.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {student.class}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedStudents.includes(student.id)
                            ? "border-[#1d68bd] bg-[#1d68bd]"
                            : "border-gray-500"
                        }`}
                      >
                        {selectedStudents.includes(student.id) && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sticky bottom-0 pt-6">
                <div className="bg-[#27282c] p-6 rounded-b-xl -mx-6 -mb-6 border-t border-gray-800">
                  <Link
                    to="/video-call"
                    className={`block text-center ${
                      (isAdmin && (!selectedHost || !selectedSubject)) ||
                      (!isAdmin && !selectedSubject)
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-[#1d68bd] hover:bg-blue-600"
                    } text-white py-4 px-6 rounded-lg transition-colors text-lg font-medium`}
                    onClick={(e) => {
                      if (
                        (isAdmin && (!selectedHost || !selectedSubject)) ||
                        (!isAdmin && !selectedSubject)
                      ) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {isAdmin && !selectedHost
                      ? "Please select a host"
                      : !selectedSubject
                      ? "Please select a subject"
                      : "Start Meeting"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TestDevicesModal />
    </div>
  );
};

export default InitiateMeet;
