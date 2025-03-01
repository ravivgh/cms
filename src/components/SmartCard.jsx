import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import cardDemo from "../assets/card.jpg";
import lightLogo from "../assets/logo.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FaUniversity } from "react-icons/fa";
const BackgroundImageCard = () => {
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    // Start the launch after 3 seconds
    const launchTimer = setTimeout(() => {
      setIsLaunching(true);
    }, 3000); // 3 seconds

    // Clean up the timer when the component unmounts
    return () => clearTimeout(launchTimer);
  }, []);
  return (
    <>
      {" "}
      <div className="flex items-center justify-around mx-auto mt-10">
        <Card
          className="relative h-[400px] w-[250px] bg-cover bg-center overflow-hidden rounded-2xl shadow-2xl"
          style={{ backgroundImage: `url(${cardDemo})` }}
        >
          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="flex items-center justify-between">
            <div className="p-3 ">
              <img
                src={lightLogo}
                alt="Logo"
                className="w-[100px] h-auto mix-blend-screen opacity-70"
              />
            </div>
            <div className="section  pr-3">
              <p className="text-[10px] text-white bg-orange-600  px-2 py-1 shadow-2xl rounded-full border">
                SYBCA
              </p>
            </div>
          </div>
          <CardHeader className="relative z-10 text-white">
            <CardTitle className=" mix-blend-screen"></CardTitle>
          </CardHeader>

          <CardContent className="relative z-10 text-white">
            <div className="flex items-center justify-center flex-col">
              <Avatar className="w-20 h-20 shadow-xl">
                <AvatarImage
                  src="https://avatars.githubusercontent.com/u/3?v=4"
                  alt="@shadcn"
                />
              </Avatar>
              <div className="">John Smith</div>
              <div className="flex items-center ">
                <FaUniversity />

                <p className="text-sm pl-1">Vivekananda College </p>
              </div>
              <div className="contact-student">
                <p>8156095464</p>
              </div>
            </div>
            <div className="mt-24">
              <div className="flex items-center text-xs text-gray-400">
                <div className="text-yellow-500">ENRL NO : </div>
                <p className="pl-1"> E22110205000225978</p>
              </div>
              <div className="flex items-center">
                <div className="text-gray-300">SPID : </div>
                <p className="pl-1">2022080447</p>
              </div>
            </div>
          </CardContent>
          <div className={`rocket ${isLaunching ? "launching" : ""}`}>
            <div className="rocket-body">
              <div className="rocket-fin left-fin"></div>
              <div className="rocket-fin right-fin"></div>
              <div className="rocket-window"></div>
            </div>
            <div className="rocket-flame"></div>
            <div className="smoke"></div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default BackgroundImageCard;

{
  /* <div className="faculty-intro-card ">
<Card className="max-w-[500px] h-[250px] shadow-[5px_0_10px_-11px_rgba(0,0,0,0.5)] rounded-3xl bg-gradient-to-t from-[#0c1c33] via-[#7a296c]  to-[#bf9977]  hover:bg-[#74747431]">
  <CardHeader>
    <h1 className=" text-center  text-white text-2xl">
      Campus Quiz Quest
    </h1>
    <div className="border-[1px] border-transparent bg-gradient-to-r from-[#7a296c] to-[#bf9977] border-image animate-gradient bg-[length:200%_200%] mx-24 py-[0.5px]"></div>
    <CardDescription className="text-center  text-base text-gray-300">
      Enhance student learning with interactive quizzes.
    </CardDescription>
  </CardHeader>
  <div className="quiz-icon-intro  pt-3 pb-3 flex items-center justify-between ">
    <div className="mt-20 ">
      <TbMath
        style={{ fontSize: "40px" }}
        className="bg-[#ffffff3c]   rounded-lg text-gray-200"
      />
    </div>
    <div className="mb-16 shadow-lg z-10">
      <GiMaterialsScience
        style={{ fontSize: "30px" }}
        className="bg-[#ffffff3c]   rounded-lg text-gray-200"
      />
    </div>
    <div className="bg-[#ffffff3c]    rounded-lg p-[2px] shadow-lg z-10">
      <FaHtml5
        style={{ fontSize: "40px" }}
        className=" text-gray-200"
      />
    </div>
    <div className="mb-20 shadow-lg z-10">
      <IoLogoNodejs
        style={{ fontSize: "30px" }}
        className="bg-[#ffffff3c]   rounded-lg text-gray-200"
      />
    </div>
    <div className="mt-10 bg-[#ffffff3c]  rounded-lg p-[2px] shadow-lg">
      <GiDatabase
        style={{ fontSize: "30px" }}
        className=" text-gray-200"
      />
    </div>
  </div>

  <CardContent className="relative bottom-40 ">
    {" "}
    <div className="">
      <svg viewBox="0 0 800 200">
        {/* Ribbon Paths */
}

//   <motion.path
//     d="M0 100 Q150 50 300 100 T600 100"
//     stroke="purple"
//     fill="none"
//     strokeWidth="3"
//     variants={ribbonVariants}
//     initial="initial"
//     animate="animate"
//   />
// </svg>

//     <div className={`rocket ${isLaunching ? "launching" : ""}`}>
//       <div className="rocket-body">
//         <div className="rocket-fin left-fin"></div>
//         <div className="rocket-fin right-fin"></div>
//         <div className="rocket-window"></div>
//       </div>
//       <div className="rocket-flame"></div>
//       <div className="smoke"></div>
//     </div>
//   </div>
// </CardContent>
// </Card>
// </div>
// <div
// style={{ position: "absolute", width: "120px", height: "150px" }}
// className="left-[530px]"
// >
// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   viewBox="0 0 200 200"
//   style={{ width: "100%", height: "100%" }}
// >
//   {/* Blue Circle */}
//   <motion.circle
//     cx="50"
//     cy="50"
//     r="8"
//     fill="blue"
//     variants={circleVariants}
//     animate="animate"
//   />

// {/* Yellow Square */}
// <motion.rect
//   x="100"
//   y="20"
//   width="10"
//   height="10"
//   fill="gold"
//   rx="2"
//   variants={rectVariants}
//   animate="animate"
// />

{
  /* Purple Lines
  <motion.line
    x1="50"
    y1="100"
    x2="100"
    y2="100"
    stroke="purple"
    strokeWidth="4"
    animate={{
      x1: [50, 60, 50],
      strokeWidth: [4, 6, 4],
    }}
    transition={{ repeat: Infinity, duration: 2 }}
  />
  <motion.line
    x1="50"
    y1="110"
    x2="80"
    y2="110"
    stroke="purple"
    strokeWidth="4"
    animate={{
      x1: [50, 60, 50],
      strokeWidth: [4, 6, 4],
    }}
    transition={{ repeat: Infinity, duration: 2 }}
  /> */
}

//   {/* Green Circle */}
//   <motion.circle
//     cx="80"
//     cy="150"
//     r="6"
//     fill="green"
//     animate={{ scale: [1, 1.2, 1] }}
//     transition={{ repeat: Infinity, duration: 1.5 }}
//   />
// </svg>
// </div>
// <div
// style={{ position: "absolute", width: "120px", height: "150px" }}
// className="right-[420px]"
// >
// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   viewBox="0 0 200 200"
//   style={{ width: "100%", height: "100%" }}
// >
//   {/* Blue Circle */}
//   <motion.circle
//     cx="50"
//     cy="50"
//     r="8"
//     fill="blue"
//     variants={circleVariants}
//     animate="animate"
//   />

//   {/* Yellow Square */}
//   <motion.rect
//     x="100"
//     y="20"
//     width="10"
//     height="10"
//     fill="gold"
//     rx="2"
//     variants={rectVariants}
//     animate="animate"
//   />

//   {/* Green Circle */}
//   <motion.circle
//     cx="80"
//     cy="150"
//     r="6"
//     fill="green"
//     animate={{ scale: [1, 1.2, 1] }}
//     transition={{ repeat: Infinity, duration: 1.5 }}
//   />
// </svg>
// </div> */}
