import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FacultyLogin = ({
  numberOfTeeth = 120,
  animationDuration = 5000,
  facultyName = localStorage.getItem("Student_Name") || localStorage.getItem("staff_name"),
}) => {
  const [state, setState] = useState({
    faceDetected: false,
    showTeeth: true,
    showBorder: false,
    progress: 0,
    teethHighlighted: 0,
    leaveData: { reason: "", startDate: null, endDate: null },
    submissionStatus: null,
    errors: {},
  });

  const COLORS = {
    primary: "#0A66C2",
    secondary: "#FFFFFF",
    accent: "#737373",
    background: "#F3F2EF",
    highlight: "rgba(10, 102, 194, 0.9)",
    inactive: "rgba(120, 120, 120, 0.3)",
    success: "#00A0DC",
    error: "#FF0000",
  };
  const TEETH_RADIUS = 90;

  const getTeethPaths = () => {
    const paths = [];
    const deltaAngle = (2 * Math.PI) / Math.max(1, numberOfTeeth);
    for (let i = 0; i < numberOfTeeth; i++) {
      const angle = deltaAngle * i;
      const pathData = `M ${TEETH_RADIUS * Math.cos(angle)} ${TEETH_RADIUS * Math.sin(angle)} A ${TEETH_RADIUS} ${TEETH_RADIUS} 0 0 1 ${TEETH_RADIUS * Math.cos(angle + deltaAngle)} ${TEETH_RADIUS * Math.sin(angle + deltaAngle)} L 0 0 Z`;
      paths.push(pathData);
    }
    return paths;
  };
  const teethPaths = getTeethPaths();

  useEffect(() => {
    const startTime = Date.now();
    let rafId;
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      setState((prev) => ({
        ...prev,
        progress,
        teethHighlighted: Math.round(progress * numberOfTeeth),
      }));
      if (progress < 1) rafId = requestAnimationFrame(updateProgress);
    };

    rafId = requestAnimationFrame(updateProgress);

    const detectionTimer = setTimeout(() => {
      setState((prev) => ({ ...prev, faceDetected: true }));
    }, 3000);

    const borderTimer = setTimeout(() => {
      setState((prev) => ({ ...prev, showTeeth: false, showBorder: true }));
    }, 5000);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(detectionTimer);
      clearTimeout(borderTimer);
      window.speechSynthesis.cancel();
    };
  }, [animationDuration, numberOfTeeth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      leaveData: { ...prev.leaveData, [name]: value },
      errors: { ...prev.errors, [name]: "" },
    }));
  };

  const handleStartDateChange = (date) => {
    setState((prev) => ({
      ...prev,
      leaveData: { ...prev.leaveData, startDate: date },
      errors: { ...prev.errors, startDate: "" },
    }));
  };

  const handleEndDateChange = (date) => {
    setState((prev) => ({
      ...prev,
      leaveData: { ...prev.leaveData, endDate: date },
      errors: { ...prev.errors, endDate: "" },
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};
    const { reason, startDate, endDate } = state.leaveData;

    if (!reason.trim()) {
      errors.reason = "Reason is required";
      isValid = false;
    }

    if (!startDate) {
      errors.startDate = "Start date is required";
      isValid = false;
    }

    if (!endDate) {
      errors.endDate = "End date is required";
      isValid = false;
    }

    if (startDate && endDate && startDate > endDate) {
      errors.endDate = "End date must be after start date";
      isValid = false;
    }

    setState((prev) => ({ ...prev, errors }));
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setState((prev) => ({ ...prev, submissionStatus: "submitting" }));

    const leaveData = {
      tid: parseInt(localStorage.getItem("staff_id")),
      startDate: state.leaveData.startDate,
      endDate: state.leaveData.endDate,
      reason: state.leaveData.reason,
      college_id: parseInt(localStorage.getItem("college_id")),
    };

    try {
      const response = await fetch("http://localhost:5472/services/addleaveforstaff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leaveData),
      });

      const data = await response.json();

      if (response.ok) {
        setState((prev) => ({ ...prev, submissionStatus: "success" }));
        setTimeout(
          () => setState((prev) => ({ ...prev, submissionStatus: null })),
          3000
        );
      } else {
        setState((prev) => ({ ...prev, submissionStatus: "error", errors: { ...prev.errors, general: data.message || "Failed to submit leave request." } }));
        setTimeout(
          () => setState((prev) => ({ ...prev, submissionStatus: null, errors: { ...prev.errors, general: "" } })),
          3000
        );
      }
    } catch (error) {
      setState((prev) => ({ ...prev, submissionStatus: "error", errors: { ...prev.errors, general: "Network error. Please try again." } }));
      setTimeout(
        () => setState((prev) => ({ ...prev, submissionStatus: null, errors: { ...prev.errors, general: "" } })),
        3000
      );
      console.error("Error submitting leave request:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F2EF] flex items-center justify-center p-6">
      <div className="relative max-w-4xl w-full bg-white rounded-xl p-8 flex gap-10 border border-gray-200">
        <div className="relative flex-shrink-0 w-72">
          {!state.faceDetected ? (
            <>
              <div className="absolute -inset-4 bg-gradient-to-r from-[#0A66C2]/10 via-[#00A0DC]/10 to-[#0A66C2]/10 rounded-full blur-2xl animate-pulse opacity-60"></div>
              {state.showTeeth && (
                <svg
                  width="340"
                  height="340"
                  viewBox="-95 -95 190 190"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
                >
                  {teethPaths.map((pathData, index) => (
                    <path
                      key={index}
                      d={pathData}
                      fill={index < state.teethHighlighted ? COLORS.highlight : COLORS.inactive}
                      stroke="rgba(10, 102, 194, 0.2)"
                      strokeWidth="0.6"
                      transform={`rotate(${(360 / numberOfTeeth) * index})`}
                      className="transition-colors duration-300"
                    />
                  ))}
                </svg>
              )}
              <div className="relative w-72 h-72 rounded-full overflow-hidden border-2 border-[#0A66C2]/20 shadow-md">
                <img
                  src={`http://localhost:5472/profilepics/${localStorage.getItem("student_id")}.png`}alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A66C2]/5 to-transparent animate-scan"></div>
              </div>
            </>
          ) : (
            <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-[#00A0DC] shadow-[0_0_15px_rgba(0,160,220,0.3)] animate-fade-in">
              <img
                src={`http://localhost:5472/profilepics/${localStorage.getItem("student_id")}.png`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-[#00A0DC]/10 rounded-full animate-pulse-slow"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A66C2]/10 to-transparent animate-fade-in"></div>
              <svg
                className="absolute top-4 right-4 w-12 h-12 text-[#00A0DC] animate-checkmark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {state.showBorder && (
                <div className="absolute -inset-2 border-3 border-[#00A0DC] rounded-full animate-pulse shadow-[0_0_20px_rgba(0,160,220,0.5)]"></div>
              )}
            </div>
          )}
        </div>

        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-gray-900">
              {facultyName}
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Verify your identity to submit a leave request with duration to
              the administration.
            </p>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E6F0FA] border border-[#0A66C2]/20">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  state.faceDetected ? "bg-[#00A0DC]" : "bg-[#737373]"
                } animate-pulse`}
              ></div>
              <span className="text-sm font-medium text-[#0A66C2]">
                {state.faceDetected ? "Verified" : "Verifying Identity..."}
              </span>
            </div>

            {state.faceDetected && (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 animate-fade-in"
              >
                <div className="grid gap-4">
                  <div>
                    <label className="text-gray-700 text-sm font-medium">
                      Reason for Leave
                    </label>
                    <textarea
                      name="reason"
                      value={state.leaveData.reason}
                      onChange={handleInputChange}
                      placeholder="e.g., Medical leave, personal emergency..."
                      className="mt-1 w-full p-3 bg-white border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-[#0A66C2] focus:border-[#0A66C2] transition-all duration-300 min-h-[100px]"
                      required
                    />
                    {state.errors.reason && (
                      <p className="text-red-500 text-xs mt-1">
                        {state.errors.reason}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-700 text-sm font-medium">
                        Start Date
                      </label>
                      <DatePicker
                        selected={state.leaveData.startDate}
                        onChange={handleStartDateChange}
                        className="mt-1 w-full p-3 bg-white border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-[#0A66C2] focus:border-[#0A66C2] transition-all duration-300"
                        placeholderText="Select start date"
                        dateFormat="dd/MM/yyyy"
                      />
                      {state.errors.startDate && (
                        <p className="text-red-500 text-xs mt-1">
                          {state.errors.startDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-medium">
                        End Date
                      </label>
                      <DatePicker
                        selected={state.leaveData.endDate}
                        onChange={handleEndDateChange}
                        className="mt-1 w-full p-3 bg-white border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-[#0A66C2] focus:border-[#0A66C2] transition-all duration-300"
                        placeholderText="Select end date"
                        dateFormat="dd/MM/yyyy"
                      />
                      {state.errors.endDate && (
                        <p className="text-red-500 text-xs mt-1">
                          {state.errors.endDate}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={state.submissionStatus === "submitting"}
                  className="w-full py-2.5 bg-[#0A66C2] text-white font-medium rounded-md hover:bg-[#004182] transition-all duration-300 disabled:bg-[#0A66C2]/70 disabled:cursor-not-allowed shadow-sm"
                >
                  {state.submissionStatus === "submitting"
                    ? "Submitting..."
                    : "Submit Leave Request"}
                </button>
                {state.submissionStatus === "success" && (
                  <p className="text-[#00A0DC] text-center text-sm animate-fade-in">
                    Leave Request Submitted Successfully!
                  </p>
                )}
                {state.submissionStatus === "error" && state.errors.general && (
                  <p className="text-[#FF0000] text-center text-sm animate-fade-in">
                    {state.errors.general}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.4;
          }
        }
        @keyframes spin-slow {
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes checkmark {
          0% {
            stroke-dasharray: 0 100;
            opacity: 0;
          }
          50% {
            stroke-dasharray: 50 100;
            opacity: 1;
          }
          100% {
            stroke-dasharray:100 10;
            opacity: 1;
          }
        }
        .animate-pulse {
          animation: pulse 1.5s infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-scan {
          animation: scan 2s infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-checkmark {
          stroke-dasharray: 100;
          animation: checkmark 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FacultyLogin;