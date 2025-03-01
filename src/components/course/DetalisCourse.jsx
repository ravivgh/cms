import React, { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaCode } from "react-icons/fa6";
import { IoVideocamOutline } from "react-icons/io5";

const DetalisCourse = () => {
  const [activeContent, setActiveContent] = useState("video");
  return (
    <>
      <div className="">
        <div className=" px-6 pt-10 pb-24 bg-[#002859] overflow-hidden ">
          <div className="flex flex-col lg:flex-row items-center justify-between mx-auto space-y-10 lg:space-y-0 lg:space-x-10 max-w-6xl">
            {/* Left Section */}
            <div className="w-full lg:w-1/2 space-y-6 pl-4 lg:pl-8">
              <div className="bg-slate-600 w-fit p-2 rounded-lg border-2 border-gray-500">
                {" "}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png"
                  className="w-14 "
                  alt="React Logo"
                />
              </div>

              <div className="space-y-4">
                <h1 className="text-6xl font-bold text-white">
                  React Scratch Course
                </h1>
                <p className="text-white leading-relaxed">
                  Get on the fast track to a career in UX design. In this
                  certificate program, you’ll learn in-demand skills, and get AI
                  training from Google experts. Learn at your own pace, no
                  degree or experience required.
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="relative w-full lg:w-1/2 flex justify-center items-center">
              {/* Background Image */}
              <div
                className="absolute bg-cover bg-center h-screen w-[900px] rounded-lg shadow-lg opacity-50"
                style={{
                  backgroundImage: `url("https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/00atxywtfxvd/cu9RnSxkTH54lJWCjmB6B/4c51fde0d49f23ae8b74a6d933865c55/spotlight-image.png?auto=format%2Ccompress&dpr=1&w=726&h=480&q=40")`,
                }}
              ></div>
              {/* Foreground Image */}
              <img
                src="https://miro.medium.com/v2/resize:fit:612/1*ch9YznwxmrH971Aeyw261w.png"
                className="relative z-10 object-contain rounded-xl w-80 lg:w-96  border border-gray-500"
                alt="Foreground Image"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl  relative bottom-16">
          <div className="bg-slate-200  h-32 rounded-xl">
            <div className="flex items-center justify-around h-full text-2xl">
              <div
                className="cursor-pointer flex items-center gap-3 flex-col hover:bg-gray-300 p-5 rounded-md "
                onClick={() => setActiveContent("video")}
              >
                <IoVideocamOutline className="text-black" />

                <p className="text-sm text-black">Pdf and Word</p>
              </div>
              <div
                className="cursor-pointer flex items-center gap-3 flex-col hover:bg-gray-300 p-5 rounded-md"
                onClick={() => setActiveContent("youtube")}
              >
                <AiOutlineYoutube className="text-black" />

                <p className="text-sm text-black">Pdf and Word</p>
              </div>
              <div
                className="cursor-pointer flex items-center gap-3 flex-col hover:bg-gray-300 p-5 rounded-md"
                onClick={() => setActiveContent("code")}
              >
                <FaCode className="text-black" />

                <p className="text-sm text-black">Pdf and Word</p>
              </div>
              <div
                className="cursor-pointer flex items-center gap-3 flex-col hover:bg-gray-300 p-5 rounded-md"
                onClick={() => setActiveContent("pdf")}
              >
                <IoDocumentTextOutline className="text-black" />

                <p className="text-sm text-black">Pdf and Word</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-24">
          <div className="mx-auto max-w-6xl">
            {/* <div className="max-w-[450px] px-5">
              <h1 className="text-black text-2xl">About Course</h1>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                nesciunt ducimus perferendis neque soluta quam, architecto
                delectus est dicta praesentium et aspernatur minima fuga
                reiciendis facere voluptatem. Similique, aliquam totam?Lorem
                ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, odit
                blanditiis. Exercitationem at illo culpa nisi iusto vero rem
                nesciunt impedit eum sint velit natus, perferendis, officia
                dolorem! Corrupti adipisci eius, culpa odit accusamus officiis
                sed quaerat rerum sapiente accusantium deserunt similique
                necessitatibus corporis laborum sit, iusto obcaecati reiciendis
                ullam eos possimus nam tempore facilis alias? Laboriosam esse
                exercitationem libero ad impedit consequuntur quidem at omnis
                molestias dolores magnam ut perferendis veniam sunt minima
                cupiditate animi ea, laudantium illum nostrum repellat. Incidunt
                sapiente illum, quasi mollitia quaerat deserunt officia quos
                quisquam, inventore vitae molestias.
              </p>
            </div> */}
            {activeContent === "video" && (
              <div>
                <h1 className="text-black text-2xl">This is a PDF View</h1>
              </div>
            )}

            {activeContent === "youtube" && (
              <div className="flex flex-wrap gap-3">
                <iframe
                  width="300"
                  height="169"
                  className=""
                  src="https://www.youtube.com/embed/7CqJlxBYj-M"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: "8px" }}
                ></iframe>
                <iframe
                  width="300"
                  height="169"
                  className=""
                  src="https://www.youtube.com/embed/7CqJlxBYj-M"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: "8px" }}
                ></iframe>
              </div>
            )}

            {activeContent === "code" && (
              <div>
                <h1 className="text-black text-2xl">Code Snippets</h1>
                <p className="text-gray-500">
                  Here you can display some code examples.
                </p>
              </div>
            )}

            {activeContent === "pdf" && (
              <div>
                <h1 className="text-black text-2xl">Recorded Video</h1>
                <p className="text-gray-500">This section contains videos.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetalisCourse;
