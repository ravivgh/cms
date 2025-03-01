import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";

const StudentLogin = ({ numberOfTeeth = 120, animationDuration = 5000 }) => {
  const videoRef = useRef(null);
  const [bgColor, setBgColor] = useState("#181818");
  const [faceDetected, setFaceDetected] = useState(false);
  const [showGreenBorder, setShowGreenBorder] = useState(false);
  const [showTeeth, setShowTeeth] = useState(true);

  useEffect(() => {
    // Start the camera feed on component load
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Camera error:", err);
      });

    // Change background color to green after 3 seconds and simulate face detection
    const timer = setTimeout(() => {
      setBgColor("green");
      setFaceDetected(true);
    }, 3000);

    // Set a timer to hide teeth and show green border after 5 seconds
    const borderTimer = setTimeout(() => {
      setShowTeeth(false); // Hide the teeth
      setShowGreenBorder(true); // Show the green border
    }, 5000);

    // Cleanup camera stream on component unmount
    return () => {
      clearTimeout(timer);
      clearTimeout(borderTimer);
      const stream = videoRef.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const [progress, setProgress] = useState(0);
  const [teethHighlighted, setTeethHighlighted] = useState(0);
  const highlightColor = "rgb(17, 103, 82)";
  const inactiveColor = "rgb(94, 93, 93)";
  const teethRadius = 80;

  // Function to generate positions for the teeth in a circular layout
  const getTeethPaths = () => {
    const paths = [];
    const deltaAngle = (2 * Math.PI) / Math.max(1, numberOfTeeth); // Ensure numberOfTeeth is at least 1

    for (let i = 0; i < numberOfTeeth; i++) {
      const angle = deltaAngle * i;
      const startAngle = angle;
      const endAngle = angle + deltaAngle;

      // Generate the path for each tooth (sector of the circle)
      const pathData = `M ${teethRadius * Math.cos(startAngle)} ${
        teethRadius * Math.sin(startAngle)
      } A ${teethRadius} ${teethRadius} 0 0 1 ${
        teethRadius * Math.cos(endAngle)
      } ${teethRadius * Math.sin(endAngle)} L 0 0 Z`;

      paths.push(pathData);
    }

    return paths;
  };

  const teethPaths = getTeethPaths();

  // Update progress at regular intervals using requestAnimationFrame
  useEffect(() => {
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min(elapsedTime / animationDuration, 1);

      setProgress(newProgress);
      setTeethHighlighted(Math.round(newProgress * numberOfTeeth));

      if (newProgress < 1) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);

    return () => {
      clearTimeout();
    };
  }, [animationDuration, numberOfTeeth]);

  return (
    <div className="bg-[#1a1919] w-full h-screen flex items-center justify-center">
      <div className="flex items-center justify-center gap-14 mx-auto relative">
        <div className="relative">
          {/* Teeth animation in the background as a border */}
          {showTeeth && (
            <div className="absolute inset-0 z-0 flex justify-center items-center">
              <svg
                width="320"
                height="320"
                viewBox="-60 -60 120 120"
                style={{
                  borderRadius: "50%",
                  position: "absolute",
                  top: -10,
                  left: -10,
                }}
              >
                {teethPaths.map((pathData, index) => {
                  const isHighlighted = index < teethHighlighted;
                  const fillColor = isHighlighted ? "#116752" : inactiveColor;

                  return (
                    <path
                      key={index}
                      d={pathData}
                      fill={fillColor}
                      stroke="none"
                      strokeWidth="1"
                      transform={`rotate(${(360 / numberOfTeeth) * index})`}
                    />
                  );
                })}
              </svg>
            </div>
          )}

          {/* Avatar with Camera Feed */}
          <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden  z-10">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>
          {showGreenBorder && (
            <div
              style={{
                position: "absolute",
                top: -10,
                left: -10,
                width: "320px",
                height: "320px",
                borderRadius: "50%",
                border: "4px solid green",
                zIndex: 1,
              }}
            />
          )}
        </div>
        <div className="text-white">
          <div className="space-y-7">
            <div>
              <img src={logo} alt="Logo" className="mix-blend-screen w-36" />
            </div>
            <div>
              <div className="flex items-center text-white gap-2">
                <span>Hey</span>
                <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-300  animate-gradient bg-[length:200%_200%] font-medium">
                  Sara Smith <span className="text-gray-400">,</span>
                </h1>
              </div>
              <div>
                <p className="text-slate-00">
                  Before we begin attendance, please scan your face for
                  reference
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-gray-500">
              Please make sure your head is in the circle while we scan your
              face.
            </p>
          </div>
          <div className="mt-14 flex items-center gap-3">
            <p
              className={`w-fit px-3 py-1 rounded-full ${
                faceDetected ? "bg-[#116752]" : "bg-yellow-600"
              } flex items-center gap-1`}
            >
              <div
                className={`w-2 h-2 ${
                  faceDetected ? "bg-green-600" : "bg-yellow-800"
                } rounded-full`}
              ></div>
              {faceDetected ? "Face Detected!" : "Scanning..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
