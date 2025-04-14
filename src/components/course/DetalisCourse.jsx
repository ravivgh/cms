
import React, { useState, useEffect } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineYoutube,AiTwotoneFile } from "react-icons/ai";
import { useParams } from "react-router-dom";

const DetalisCourse = () => {
  const { courseId } = useParams();
  const [activeContent, setActiveContent] = useState("youtube");
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "http://localhost:5472/services/get-course-details-by-id",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ courseId }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data && data.length > 0) {
          setCourseDetails(data[0]);
        } else {
          setError("Course not found.");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch course details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!courseDetails) {
    return <div>Course details not available.</div>;
  }

  const getYouTubeVideoId = (url) => {
    const regExp = /^.*((http:\/\/googleusercontent\.com\/youtube\.com\/2\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7] && match[7].length === 11 ? match[7] : null;
  };

  return (
    <>
      <div className="">
        <div className=" px-6 pt-10 pb-24 bg-[#002859] overflow-hidden ">
          <div className="flex flex-col lg:flex-row items-center justify-between mx-auto space-y-10 lg:space-y-0 lg:space-x-10 max-w-6xl">
            <div className="w-full lg:w-1/2 space-y-6 pl-4 lg:pl-8">
              

              <div className="space-y-4">
                <h1 className="text-6xl font-bold text-white">{courseDetails.crsid}</h1>
                <p className="text-white leading-relaxed">{courseDetails.description}</p>
              </div>
            </div>

            
          </div>
        </div>
        <div className="mx-auto max-w-6xl  relative bottom-16">
          <div className="bg-slate-200  h-32 rounded-xl">
            <div className="flex items-center justify-around h-full text-2xl">
              <div
                className="cursor-pointer flex items-center gap-3 flex-col hover:bg-gray-300 p-5 rounded-md"
                onClick={() => setActiveContent("youtube")}
              >
                <AiOutlineYoutube className="text-black" />
                <p className="text-sm text-black">Videos</p>
              </div>
              <div
                className="cursor-pointer flex items-center gap-3 flex-col hover:bg-gray-300 p-5 rounded-md"
                onClick={() => setActiveContent("pdf")}
              >
                <IoDocumentTextOutline className="text-black" />
                <p className="text-sm text-black">Documents</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-24">
          <div className="mx-auto max-w-6xl">
            {activeContent === "youtube" && (
              <div className="flex flex-wrap gap-3">
                {courseDetails.youtube_link &&
                  courseDetails.youtube_link.split(",").map((link, index) => {
                    const videoId = getYouTubeVideoId(link);
                    if (videoId) {
                      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                      return (
                        <iframe
                          key={index}
                          width="300"
                          height="169"
                          className=""
                          src={embedUrl}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ borderRadius: "8px" }}
                        ></iframe>
                      );
                    } else {
                      return <p key={index}>Invalid YouTube link</p>;
                    }
                  })}
              </div>
            )}

            {activeContent === "pdf" && (
              <div>
                <h1 className="text-black text-2xl">Documents</h1>
                <div className="flex flex-col gap-2">
                  {courseDetails.documenturl &&
                    courseDetails.documenturl.split(",").map((doc, index) => {
                      const documentUrl = `http://localhost:5472/course_documents/${doc}`;
                      return (
                        <div key={index} className="flex items-center gap-2 border p-2 rounded-md">
                          <AiTwotoneFile></AiTwotoneFile>
                          <a href={documentUrl} download className="flex-1">
                            {doc}
                          </a>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetalisCourse;