import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AiOutlineSolution } from "react-icons/ai";
import { IoIosPlay } from "react-icons/io";

const VideoProgress = ({
  isActive,
  color,
  src,
  currentAvatar,
  allAvatars,
  onVideoEnd,
  currentName,
  backgroundImage,
}) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.addEventListener("loadedmetadata", () => {
        setDuration(videoElement.duration);
      });
      videoElement.addEventListener("ended", onVideoEnd);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("loadedmetadata", () => {});
        videoElement.removeEventListener("ended", onVideoEnd);
      }
    };
  }, [onVideoEnd]);

  useEffect(() => {
    if (videoRef.current) {
      isActive ? videoRef.current.play() : videoRef.current.pause();
    }
  }, [isActive]);

  const updateProgress = () => {
    if (videoRef.current && duration > 0) {
      setProgress((videoRef.current.currentTime / duration) * 100);
    }
  };
  const toggleMute = () => {
    if (videoRef.current) {
      setIsMuted(!isMuted);
      videoRef.current.muted = !isMuted;
    }
  };

  // Handle video click to mute/unmute
  const handleVideoClick = () => {
    toggleMute();
  };

  return (
    <div className="flex flex-col lg:flex-row items-center  space-y-6 lg:space-y-0 lg:space-x-8">
      <div
        className="w-full lg:w-1/2 py-24  "
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.5s ease-in-out",
        }}
      >
        <div className="relative">
          <div className="">
            <video
              ref={videoRef}
              src={src}
              width="650"
              muted
              className="rounded-r-full shadow-xl"
              onTimeUpdate={updateProgress}
              onClick={handleVideoClick}
            />
          </div>
          {isMuted && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              onClick={toggleMute}
            >
              <IoIosPlay className="w-16 h-16 text-[#1d68bd] md:w-24 md:h-24 lg:w-40 lg:h-40" />
            </div>
          )}
        </div>
      </div>
      <div className="space-y-5">
        <div className=" space-y-5 px-10">
          <div className="">
            <h1 className="text-[#f6f6f6] text-base flex items-center gap-2 bg-[#116752] w-fit rounded-full px-4 py-2 ">
              <span className="bg-[#2a2a2a] text-[#f3f3f3] rounded-full p-2 ">
                <AiOutlineSolution />
              </span>
              Over{" "}
              <span className="font-semibold text-[#f3f7f6]">Solutions</span>
            </h1>

            <p className="text-white text-md mt-2">
              {" "}
              Your go-to solution for smarter college management, combining
              simplicity, efficiency, and innovation.
            </p>
          </div>
          <h1 className="text-gray-400 text-4xl">
            CampusFlow is{" "}
            <span className="font-semibold text-white">Reliable</span>,{" "}
            <span className="font-semibold text-white">Fast </span>
            and <span className="font-semibold text-white">Helpful</span>
          </h1>
        </div>
        {/* Progress Ring & Avatar Section */}
        <div className="flex items-center space-x-4 bg-[#353535] p-4 rounded-l-full">
          {/* Progress Ring with Current Avatar */}
          <div className="relative w-24 h-24">
            <svg width="100%" height="100%">
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                fill="transparent"
                stroke="#434343"
                strokeWidth="8"
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r={radius}
                fill="transparent"
                stroke={color}
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress / 100)}
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "50% 50%",
                }}
                animate={{
                  strokeDashoffset: circumference * (1 - progress / 100),
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Avatar className="w-20 h-20">
                <AvatarImage src={currentAvatar} />
              </Avatar>
            </div>
            <p className="mt-6 text-sm  text-white text-center flex items-center gap-2 w-fit">
              <span className="w-1 h-7 bg-[#3c5dae]"></span>
              {currentName}
            </p>
          </div>

          {/* Beside Avatars Section */}
          <div className="flex space-x-2">
            {allAvatars.map((avatar, index) =>
              avatar !== currentAvatar ? (
                <Avatar key={index} className="w-12 h-12">
                  <AvatarImage src={avatar} />
                </Avatar>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default VideoProgress;
