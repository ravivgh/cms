import { motion } from "framer-motion";
import { FaUniversity } from "react-icons/fa";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FcVoicePresentation } from "react-icons/fc";
const AnimatedStep = ({ currentSlide, setCurrentSlide }) => {
  const dots = [0, 1, 2];

  return (
    <div className="flex  justify-center my-7">
      {dots.map((dot, index) => (
        <motion.div
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`rounded-sm mx-5 ${
            index === currentSlide ? "bg-[#f8f6f9]" : "bg-[#f8f6f9]"
          }`}
          initial={{ scale: 0.8 }}
          animate={{ scale: index === currentSlide ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {index === 0 && (
            <div className="flex items-center justify-center w-fit px-7 py-3 cursor-pointer border border-[#d9d9d9] rounded-full">
              <FaUniversity className="text-[#755485] c" />
              <p className="flex items-center justify-center text-center  text-sm text-gray-600 sm:pl-3 sm:text-base pl-2">
                Register
              </p>
            </div>
          )}
          {index === 1 && (
            <div className="flex items-center justify-center w-fit px-7 py-3 cursor-pointer border border-[#d9d9d9] rounded-full">
              <PiMicrosoftExcelLogoFill className="text-green-800 " />
              <p className="flex items-center justify-center text-center  text-sm text-gray-600 sm:pl-3 sm:text-base pl-2">
                Import Excel
              </p>
            </div>
          )}
          {index === 2 && (
            <div className="flex items-center justify-center  w-fit px-7 py-3 cursor-pointer border border-[#d9d9d9] rounded-full">
              <FcVoicePresentation style={{ fontSize: "25px" }} />
              <p className="flex items-center justify-center text-center  text-sm text-gray-600 sm:pl-3 sm:text-base pl-2">
                Attendance
              </p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedStep;
