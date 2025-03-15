import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";

const FaceScan = ({ numberOfTeeth = 120, animationDuration = 5000 }) => {
  const videoRef = useRef(null);
  const [bgColor, setBgColor] = useState("#181818");
  const [faceDetected, setFaceDetected] = useState(false);
  const [showGreenBorder, setShowGreenBorder] = useState(false);
  const [showTeeth, setShowTeeth] = useState(true);
  const [attendanceMarked, setAttendanceMarked] = useState(false); // State for successful attendance
  const [faceScanFailed, setFaceScanFailed] = useState(false); // State for failed face scan

  // Simulate face detection logic (random success/failure for demo purposes)
  const simulateFaceDetection = () => {
    // Randomly succeed (80% chance) or fail (20% chance)
    return Math.random() > 0.2; // Adjust this probability as needed
  };

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
        setFaceScanFailed(true); // If camera access fails, mark as failed
      });

    // Simulate face detection after 3 seconds
    const timer = setTimeout(() => {
      const detectionSuccess = simulateFaceDetection();
      if (detectionSuccess) {
        setBgColor("green");
        setFaceDetected(true);
      } else {
        setFaceScanFailed(true);
        // Stop the camera feed on failure
        const stream = videoRef.current?.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      }
    }, 3000);

    // If face detection succeeds, proceed with showing green border after 5 seconds
    const borderTimer = setTimeout(() => {
      if (faceDetected && !faceScanFailed) {
        setShowTeeth(false); // Hide the teeth
        setShowGreenBorder(true); // Show the green border
      }
    }, 5000);

    // If face detection succeeds, show attendance success message after 10 seconds
    const attendanceTimer = setTimeout(() => {
      if (faceDetected && !faceScanFailed) {
        setAttendanceMarked(true); // Show the success message
        // Stop the camera feed
        const stream = videoRef.current?.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      }
    }, 10000);

    // Cleanup camera stream and timers on component unmount
    return () => {
      clearTimeout(timer);
      clearTimeout(borderTimer);
      clearTimeout(attendanceTimer);
      const stream = videoRef.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [faceDetected, faceScanFailed]);

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

      if (newProgress < 1 && !faceScanFailed && !attendanceMarked) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);

    return () => {
      // Clear any pending animation frames
    };
  }, [animationDuration, numberOfTeeth, faceScanFailed, attendanceMarked]);

  // Handle "Scan Again" button click
  const handleScanAgain = () => {
    setFaceScanFailed(false);
    setFaceDetected(false);
    setShowGreenBorder(false);
    setShowTeeth(true);
    setBgColor("#181818");
    setProgress(0);
    setTeethHighlighted(0);

    // Restart the camera feed
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Camera error:", err);
        setFaceScanFailed(true);
      });
  };

  // If attendance is marked successfully, show the success message
  if (attendanceMarked) {
    return (
      <div className="bg-[#1a1919] w-full h-screen flex items-center justify-center">
        <div className="text-center text-white space-y-6">
          <img
            src={logo}
            alt="Logo"
            className="mix-blend-screen w-36 mx-auto"
          />
          <h1 className="text-4xl font-semibold text-green-500">
            Attendance Marked Successfully!
          </h1>
          <p className="text-gray-400">
            Your attendance has been recorded. You can now proceed with your
            meeting.
          </p>
          {/* No "Scan Again" button here as per requirements */}
        </div>
      </div>
    );
  }

  // If face scan fails, show the failure message with "Scan Again" button
  if (faceScanFailed) {
    return (
      <div className="bg-[#1a1919] w-full h-screen flex items-center justify-center">
        <div className="text-center text-white space-y-6">
          <img
            src={logo}
            alt="Logo"
            className="mix-blend-screen w-36 mx-auto"
          />
          <h1 className="text-4xl font-semibold text-red-500">
            Face Not Scanned!
          </h1>
          <p className="text-gray-400">
            We couldn't detect your face. Please try again.
          </p>
          <button
            onClick={handleScanAgain}
            className="mt-4 px-6 py-2 bg-[#116752] text-white rounded-full hover:bg-green-700 transition-colors"
          >
            Scan Again
          </button>
        </div>
      </div>
    );
  }

  // Otherwise, show the scanning UI
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
          <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden z-10">
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
                <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-300 animate-gradient bg-[length:200%_200%] font-medium">
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

export default FaceScan;
