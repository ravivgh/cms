import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
const DashProgress = ({ description, color, percentage, text }) => {
  const radius = 43; // The radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference for progress calculation
  const [progress, setProgress] = useState(0); // Internal progress state

  useEffect(() => {
    setProgress(percentage / 100); // Set the progress directly based on the percentage prop
  }, [percentage]);
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex justify-center items-center">
          {/* Progress ring */}
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
              stroke={color} // Color of the progress ring
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)} // Apply progress dynamically
              style={{
                transform: "rotate(-90deg)", // Rotate to start the ring from the top
                transformOrigin: "50% 50%",
              }}
              transition={{ duration: 0 }}
            />
          </svg>

          {/* Circle inside showing percentage */}
          <div className="absolute flex items-center justify-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <span className="text-xl font-semibold">
                {Math.round(progress * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Text and description */}
        <div className="text-center mt-14">
          <h1 className="text-black text-lg font-medium">{text}</h1>
          {description && (
            <p className="pt-2 text-gray-500 text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashProgress;
