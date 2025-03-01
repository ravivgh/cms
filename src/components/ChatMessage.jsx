import React, { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import { Input } from "@/components/ui/input";
import { LuSend } from "react-icons/lu";
import { IoMdSearch } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdAttachFile,
  MdMenu,
  MdClose,
  MdFilterList,
  MdImage,
  MdInsertDriveFile,
} from "react-icons/md";
import s from "@/assets/recive.mp3";
import sendSound from "../assets/sendSound.mp3";

const defaultAvatarUrl = "https://example.com/default-avatar.jpg";

const users = [
  {
    id: 1,
    name: "Bread Doe",
    avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
    status: "online",
    lastMessage: "Hey, how are you?",
  },
  {
    id: 2,
    name: "John Doe",
    avatarUrl: "https://avatars.githubusercontent.com/u/2?v=4",
    status: "offline",
    lastMessage: "See you tomorrow!",
  },
  {
    id: 3,
    name: "John Doe",
    avatarUrl: "https://avatars.githubusercontent.com/u/3?v=4",
    status: "online",
    lastMessage: "Thanks for the update",
  },
  {
    id: 4,
    name: "John Doe",
    avatarUrl: "https://avatars.githubusercontent.com/u/5?v=4",
    status: "away",
    lastMessage: "Meeting at 3 PM",
  },
  {
    id: 5,
    name: "John Doe",
    avatarUrl: "https://avatars.githubusercontent.com/u/5?v=4",
    status: "away",
    lastMessage: "Meeting at 3 PM",
  },
  {
    id: 6,
    name: "John Doe",
    avatarUrl: "https://avatars.githubusercontent.com/u/5?v=4",
    status: "away",
    lastMessage: "Meeting at 3 PM",
  },
  {
    id: 7,
    name: "John Doe",
    avatarUrl: "https://avatars.githubusercontent.com/u/5?v=4",
    status: "away",
    lastMessage: "Meeting at 3 PM",
  },
  {
    id: 8,
    name: "John Doe",
    avatarUrl: "https://avatars.githubusercontent.com/u/5?v=4",
    status: "away",
    lastMessage: "Meeting at 3 PM",
  },
  {
    id: 9,
    name: "John Doe",
    avatarUrl: "https://avatars.githubusercontent.com/u/5?v=4",
    status: "away",
    lastMessage: "Meeting at 3 PM",
  },
];

const receiveSound = new Audio(s);
const send = new Audio(sendSound);

const ChatMessage = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAttachOptions, setShowAttachOptions] = useState(false);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (!currentMessage.trim() && !selectedFile) return;
    await send.play();

    const userMessage = {
      text:
        currentMessage ||
        (selectedFile.type.startsWith("image/")
          ? "Sent an image"
          : "Sent a file"),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "user",
      file: selectedFile
        ? { url: URL.createObjectURL(selectedFile), type: selectedFile.type }
        : null,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setCurrentMessage("");
    setSelectedFile(null);
    setShowAttachOptions(false);

    setTimeout(async () => {
      const botMessage = {
        text: selectedFile ? "Received your file!" : "Hello Mexico Smith",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "bot",
        file: selectedFile
          ? { url: URL.createObjectURL(selectedFile), type: selectedFile.type }
          : null,
      };
      await receiveSound.play();
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setShowAttachOptions(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setShowAttachOptions(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const mappedUsers = users.map((user) => ({
    ...user,
    avatar: (
      <Avatar
        src={user.avatarUrl}
        sx={{ bgcolor: deepPurple[500], width: 36, height: 36 }}
        alt={user.name}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = defaultAvatarUrl;
        }}
      >
        {user.name[0]}
      </Avatar>
    ),
  }));

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const StatusIndicator = ({ status }) => (
    <div
      className={`w-2 h-2 rounded-full absolute bottom-0 right-0 ${
        status === "online"
          ? "bg-green-500"
          : status === "away"
          ? "bg-yellow-500"
          : "bg-gray-500"
      }`}
    />
  );

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-3 bg-[#0f151c] text-gray-300 md:hidden">
        <button
          onClick={() => setIsLeftSidebarOpen(true)}
          aria-label="Open contacts"
        >
          <MdMenu size={24} />
        </button>
        <span className="text-sm font-semibold">Chat</span>
        <button
          onClick={() => setIsRightSidebarOpen(true)}
          aria-label="Open members"
        >
          <MdMenu size={24} />
        </button>
      </div>

      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar */}
        <div
          className={`fixed md:static inset-y-0 left-0 z-40 bg-[#0f151c] text-black transition-transform duration-300 transform ${
            isLeftSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          } w-72 flex-shrink-0`}
        >
          <div className="flex items-center justify-between p-4 border-t-2 border-l border-r border-gray-600 mx-3 mt-3 rounded-t-xl">
            <div className="flex items-center">
              <Avatar
                src="https://avatars.githubusercontent.com/u/4?v=4"
                sx={{ width: 36, height: 36 }}
              />
              <div className="pl-2 text-gray-400 text-sm">Mexico Smith</div>
            </div>
            <button
              onClick={() => setIsLeftSidebarOpen(false)}
              className="md:hidden text-gray-400"
            >
              <MdClose size={24} />
            </button>
          </div>
          <div className="border border-transparent bg-gradient-to-r from-blue-600 to-purple-300 mx-24 py-[0.2px] animate-gradient bg-[length:200%_200%]" />
          <div className="relative px-3 py-4">
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts..."
              className="pl-10 pr-10 bg-[#23272f] border-none text-gray-300 text-sm rounded-md"
            />
            <IoMdSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              <MdFilterList size={20} />
            </button>
          </div>
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-[#23272f] rounded-md mx-3 p-3"
              >
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm">Status Filter</p>
                  <div className="flex flex-wrap gap-2">
                    {["all", "online", "offline", "away"].map((status) => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-3 py-1 rounded-full text-xs ${
                          statusFilter === status
                            ? "bg-blue-600 text-white"
                            : "bg-[#1a1e24] text-gray-400"
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <ScrollArea className="h-[calc(100vh-220px)] px-3">
            {filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                whileHover={{ scale: 1.02 }}
                className="flex items-center p-3 my-2 rounded-xl bg-[#23272f] cursor-pointer"
              >
                <div className="relative">
                  <Avatar
                    src={user.avatarUrl}
                    sx={{ bgcolor: deepPurple[500], width: 36, height: 36 }}
                    alt={user.name}
                  />
                  <StatusIndicator status={user.status} />
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="text-gray-200 text-sm truncate">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-400 truncate">
                    {user.lastMessage}
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredUsers.length === 0 && (
              <div className="text-center text-gray-400 text-sm mt-4">
                No contacts found
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col items-center justify-between p-4 h-full w-full">
          <div className="flex flex-col w-full gap-4 overflow-hidden h-full">
            <ScrollArea className="flex-1 p-4 overflow-y-auto h-full [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-3xl dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
              {messages.length > 0 && (
                <span className="text-xs text-gray-400 mt-1 text-center block">
                  {formattedDate}
                </span>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start p-3 rounded-md shadow-md w-fit max-w-[80%] sm:max-w-[60%] md:max-w-sm ${
                    message.sender === "user"
                      ? "ml-auto bg-[#23272f] text-white"
                      : "mr-auto bg-gray-100 text-gray-800"
                  } mb-3`}
                >
                  {message.sender === "bot" && (
                    <div className="flex-shrink-0">
                      <Avatar
                        src="https://avatars.githubusercontent.com/u/4?v=4"
                        sx={{ width: 36, height: 36 }}
                      />
                    </div>
                  )}
                  <div className="flex flex-col px-3">
                    {message.sender === "bot" && (
                      <div className="flex items-center">
                        <div className="pl-2 text-gray-400 text-sm">
                          Mexico Smith
                        </div>
                        <div className="role pl-2">
                          <p className="bg-[#7aa0e9] px-2 py-1 rounded-xl text-xs text-white">
                            Admin
                          </p>
                        </div>
                      </div>
                    )}
                    <p className="text-sm break-words">{message.text}</p>
                    {message.file &&
                      (message.file.type.startsWith("image/") ? (
                        <img
                          src={message.file.url}
                          alt="Uploaded"
                          className="mt-2 max-w-full h-auto rounded-md"
                          style={{ maxHeight: "200px" }}
                        />
                      ) : (
                        <a
                          href={message.file.url}
                          download={message.file.url.split("/").pop()}
                          className="mt-2 text-blue-400 underline text-sm"
                        >
                          Download File
                        </a>
                      ))}
                    <span className="text-xs text-gray-400 mt-1">
                      {message.time}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
          </div>
          <div className="w-full max-w-2xl mt-auto relative">
            <div className="flex items-center">
              <div className="bg-gray-200 p-3 sm:p-4 rounded-l-md relative">
                <MdAttachFile
                  className="text-gray-600 cursor-pointer"
                  size={20}
                  onClick={() => setShowAttachOptions(!showAttachOptions)}
                />
                <AnimatePresence>
                  {showAttachOptions && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute bottom-12 left-0 bg-[#23272f] text-white rounded-md shadow-lg p-2 z-50"
                    >
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => imageInputRef.current.click()}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-[#1a1e24] rounded-md"
                        >
                          <MdImage size={20} />
                          <span className="text-sm">Image</span>
                        </button>
                        <button
                          onClick={() => fileInputRef.current.click()}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-[#1a1e24] rounded-md"
                        >
                          <MdInsertDriveFile size={20} />
                          <span className="text-sm">File</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="*/*"
                  className="hidden"
                />
              </div>
              <Input
                type="text"
                value={currentMessage}
                placeholder="Write a message..."
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="p-4 sm:p-6 text-black bg-gray-100 flex-1 text-sm border-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="bg-[#0f151c] p-3 sm:p-4 rounded-r-md text-white flex items-center justify-center hover:bg-[#1a1e24] transition-colors"
              >
                <LuSend className="text-gray-300" size={20} />
              </button>
            </div>
            {selectedFile && (
              <div className="mt-2 flex items-center">
                {selectedFile.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MdInsertDriveFile size={20} />
                    <span className="text-sm truncate max-w-[150px]">
                      {selectedFile.name}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => setSelectedFile(null)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div
          className={`fixed md:static inset-y-0 right-0 z-40 bg-[#0f151c] transition-transform duration-300 transform ${
            isRightSidebarOpen
              ? "translate-x-0"
              : "translate-x-full md:translate-x-0"
          } w-72 flex-shrink-0 flex flex-col items-center p-3`}
        >
          <div className="w-full px-2 border border-gray-600 rounded-xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-600 text-white">
              <p className="text-sm">
                Member <span className="text-gray-500">/</span>
              </p>
              <button
                onClick={() => setIsRightSidebarOpen(false)}
                className="md:hidden text-gray-400"
              >
                <MdClose size={24} />
              </button>
            </div>
            <ScrollArea className="h-72 w-full bg-[#0f151c] text-white">
              {mappedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center m-2 p-3 rounded-lg hover:bg-[#23272fbc]"
                >
                  {user.avatar}
                  <div className="pl-2 text-gray-300 text-sm truncate">
                    {user.name}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
