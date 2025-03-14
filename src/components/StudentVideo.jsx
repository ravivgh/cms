import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Video,
  Calendar,
  Clock,
  Users,
  VideoOff,
  Mic,
  MicOff,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const JoinMeetStudent = () => {
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [scheduledMeetings, setScheduledMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Camera & Microphone States
  const videoRef = useRef(null);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const streamRef = useRef(null);

  // Fetch scheduled meetings from API
  const fetchMeetings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5472/services/getzoomstudents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          college_id: parseInt(localStorage.getItem("college_id")),
          cid: localStorage.getItem("cid"),
          section_id: localStorage.getItem("sid"),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch meetings");
      }

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setScheduledMeetings(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  // Start Camera Stream
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
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  useEffect(() => {
    startVideoStream();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Toggle Microphone
  const toggleMic = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  // Toggle Video
  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(scheduledMeetings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMeetings = scheduledMeetings.slice(startIndex, endIndex);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageClick = (page) => setCurrentPage(page);

  return (
    <div className="min-h-screen bg-[#333333] flex overflow-hidden ml-[5rem] transition-[margin] duration-300 expand-side:ml-[12.5rem]">
      {/* Left Side: Camera Preview and Device Settings */}
      <div className="w-2/5 h-screen border-r border-gray-800 overflow-y-auto">
        <div className="p-6">
          <div className="max-w-xl mx-auto space-y-6">
            <div className="bg-[#27282c] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Video className="w-5 h-5 mr-2 text-[#1d68bd]" />
                Camera Preview
              </h2>
              <div className="relative rounded-xl overflow-hidden bg-black aspect-video max-w-md mx-auto mb-6">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                {!isVideoOn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1d1e20]">
                    <VideoOff className="w-12 h-12 text-gray-500" />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center space-x-4">
                <button onClick={toggleMic} className="p-3 rounded-full bg-[#1d68bd]">
                  {isMicOn ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5 text-white" />}
                </button>
                <button onClick={toggleVideo} className="p-3 rounded-full bg-[#1d68bd]">
                  {isVideoOn ? <Video className="w-5 h-5 text-white" /> : <VideoOff className="w-5 h-5 text-white" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Scheduled Meetings with Pagination */}
      <div className="w-3/5 h-screen overflow-y-auto">
        <div className="p-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#27282c] rounded-xl p-6 mb-6">
              <h1 className="text-2xl font-semibold text-white mb-6">
                Scheduled Meetings
              </h1>

              {/* Show Loading or Error State */}
              {loading ? (
                <div className="text-center py-4 text-gray-400">Loading meetings...</div>
              ) : error ? (
                <div className="text-center py-4 text-red-500">{error}</div>
              ) : paginatedMeetings.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {paginatedMeetings.map((meeting, index) => (
                      <div key={index} className="p-4 bg-[#1d1e20] rounded-lg flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium text-white">{meeting.Meeting_Name}</h3>
                          <p className="text-sm text-gray-300 mt-1">
                            🎓 Class: {meeting.Class} | 🔢 Section: {meeting.Section}
                          </p>
                          <p className="text-sm text-gray-300 mt-1">📖 Subject: {meeting.Subject}</p>
                          <p className="text-sm text-gray-300 mt-1">
                            <Calendar className="inline w-4 h-4 mr-2" /> Date: {meeting.Date}
                          </p>
                        </div>
                        <Link to={meeting.Joinurl} target="_blank" rel="noopener noreferrer" className="bg-[#1d68bd] hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                          Join
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-4 text-gray-400">No scheduled meetings found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinMeetStudent;
