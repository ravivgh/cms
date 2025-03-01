import React, { useState } from "react";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  MessageSquare,
  Users,
  Share,
  MoreVertical,
  Settings,
} from "lucide-react";

const VideoCall = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [participants] = useState([
    {
      id: 1,
      name: "John Doe",
      avatar: "https://avatars.githubusercontent.com/u/1?v=4",
      isSpeaking: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://avatars.githubusercontent.com/u/2?v=4",
      isSpeaking: false,
    },
    {
      id: 3,
      name: "Mike Johnson",
      avatar: "https://avatars.githubusercontent.com/u/3?v=4",
      isSpeaking: false,
    },
  ]);

  const [messages] = useState([
    {
      id: 1,
      sender: "John Doe",
      message: "Hello everyone!",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      sender: "Jane Smith",
      message: "Hi John, how are you?",
      timestamp: "10:31 AM",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Main Content */}
      <div className="flex h-screen">
        {/* Video Grid */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-2 gap-4 h-full">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="relative bg-gray-800 rounded-lg overflow-hidden"
              >
                <img
                  src={participant.avatar}
                  alt={participant.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-white text-sm font-medium">
                        {participant.name}
                      </span>
                      {participant.isSpeaking && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mic className="w-4 h-4 text-white" />
                      <Video className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-gray-800 border-l border-gray-700">
          <div className="flex flex-col h-full">
            {/* Tabs */}
            <div className="flex border-b border-gray-700">
              <button className="flex-1 px-4 py-3 text-sm font-medium text-white bg-gray-700">
                <Users className="w-5 h-5 mx-auto" />
              </button>
              <button className="flex-1 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white">
                <MessageSquare className="w-5 h-5 mx-auto" />
              </button>
            </div>

            {/* Participant List */}
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase mb-4">
                Participants ({participants.length})
              </h3>
              <div className="space-y-2">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-white">
                        {participant.name}
                      </span>
                    </div>
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Section */}
            <div className="flex-1 overflow-y-auto p-4 hidden">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">
                        {message.sender}
                      </span>
                      <span className="text-xs text-gray-400">
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{message.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-full ${
                  isMuted ? "bg-red-500" : "bg-gray-600 hover:bg-gray-500"
                }`}
              >
                {isMuted ? (
                  <MicOff className="w-6 h-6 text-white" />
                ) : (
                  <Mic className="w-6 h-6 text-white" />
                )}
              </button>
              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-3 rounded-full ${
                  !isVideoOn ? "bg-red-500" : "bg-gray-600 hover:bg-gray-500"
                }`}
              >
                {isVideoOn ? (
                  <Video className="w-6 h-6 text-white" />
                ) : (
                  <VideoOff className="w-6 h-6 text-white" />
                )}
              </button>
            </div>

            {/* Center Controls */}
            <div className="flex items-center space-x-4">
              <button className="p-3 rounded-full bg-gray-600 hover:bg-gray-500">
                <Share className="w-6 h-6 text-white" />
              </button>
              <button className="p-3 rounded-full bg-red-500 hover:bg-red-600">
                <Phone className="w-6 h-6 text-white" />
              </button>
              <button className="p-3 rounded-full bg-gray-600 hover:bg-gray-500">
                <Settings className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">1:23:45</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
