import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const ProgressUser = ({
  duration,
  isActive,
  color,
  text,
  description,
  src,
}) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  useEffect(() => {
    if (isActive) {
      setIsComplete(false);
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min(elapsed / (duration * 1000), 1);
        setProgress(newProgress);

        if (elapsed < duration * 1000) {
          requestAnimationFrame(animate);
        } else {
          setIsComplete(true);
        }
      };

      requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animate);
    } else {
      // Reset progress if not active
      setProgress(0);
      setIsComplete(false);
    }
  }, [isActive, duration]);
  return (
    <>
      <div className="flex flex-col">
        <div
          className={`relative flex justify-center flex-col items-center transition-transform duration-500 ${
            isActive ? "scale-110" : "scale-100"
          } `}
        >
          {!isComplete && isActive && (
            <svg width={120} height={120} className="absolute">
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="transparent"
                stroke="#e6e6e6"
                strokeWidth="8"
              />
              <motion.circle
                cx="60"
                cy="60"
                r={radius}
                fill="transparent"
                stroke={color}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "50% 50%",
                }}
                transition={{ duration: 0 }}
              />
            </svg>
          )}
          <div className="absolute">
            <Avatar className="w-24 h-24 shadow-xl">
              {" "}
              {/* Adjust width and height here */}
              <AvatarImage src={src} />
            </Avatar>
          </div>
        </div>
        {/* <div className="">
          {isActive && (
            <h1 className="pt-[80px] text-black text-center text-lg">{text}</h1>
          )}
          {isActive && (
            <p className="pt-2 text-gray-500 text-center text-base">
              {description}
            </p>
          )}
        </div> */}
      </div>
    </>
  );
};

export default ProgressUser;
