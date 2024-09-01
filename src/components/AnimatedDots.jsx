import { motion } from "framer-motion";

const AnimatedDots = ({ currentSlide, setCurrentSlide }) => {
  const dots = [0, 1, 2];

  return (
    <div className="flex space-x-2 justify-center my-7">
      {dots.map((dot, index) => (
        <motion.div
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`w-3 h-3 rounded-full ${
            index === currentSlide ? "bg-[#755485]" : "bg-[#D3C7D8]"
          }`}
          initial={{ scale: 0.8 }}
          animate={{ scale: index === currentSlide ? 1.2 : 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      ))}
    </div>
  );
};

export default AnimatedDots;
