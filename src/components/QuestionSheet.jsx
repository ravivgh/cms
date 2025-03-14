import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FiClock } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Progress } from "@/components/ui/progress";
import { RiCopperCoinFill } from "react-icons/ri";
import { RadioGroup } from "@/components/ui/radio-group";
import { MdArrowOutward } from "react-icons/md";
import { TbMedal } from "react-icons/tb";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const QuestionSheet = () => {
  const navigate = useNavigate();
  const TOTAL_TIME = 600; // 10 minutes for entire quiz
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [answers, setAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subjects, setSubjects] = useState([]); // State to store subjects
  const [selectedSubject, setSelectedSubject] = useState("");
  const [stotalPointsEarned,setTotalpoints] = useState(0)

  // Fetch questions from the backend API
  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5472/services/get-mcqs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Cid: localStorage.getItem("cid"),
          section_id: localStorage.getItem("sid"),
          college_id: parseInt(localStorage.getItem("college_id")),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        
        const uniqueSubjects = [
          ...new Set(data.questions.map((q) => q.subject_name)),
        ];
        setSubjects(uniqueSubjects);

        
        if (selectedSubject) {
          const filteredQuestions = selectedSubject
        ? data.questions.filter((q) => q.subject_name === selectedSubject)
        : data.questions;
          
          if (filteredQuestions.length > 0) {
            const formattedQuestions = filteredQuestions.reduce((acc, curr) => {
              return acc.concat(curr.questions.map((question) => ({
                ...question,
                _id: question.id, // Use question.id as the unique identifier
                options: Object.entries(question.options).map(([key, value]) => ({ key, value })),
                rewardPoints: typeof question.rewardPoints === 'string' ? parseInt(question.rewardPoints) : question.rewardPoints || 10,
              })));
            }, []);
      
            setQuestions(formattedQuestions);
          }
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [selectedSubject]);

  useEffect(() => {
    if (!quizCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizCompleted, timeLeft]);

  useEffect(() => {
    if (quizCompleted) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [quizCompleted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOptionSelect = (questionId, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmitQuiz = () => {
    const allAnswers = [];
    let totalPointsEarned = 0;

    questions.forEach((question) => {
      const isCorrect =
        selectedAnswers[question._id] === question.correctAnswer;
      const pointsForQuestion = isCorrect ? question.rewardPoints || 10 : 0; // Default to 10 points if not provided
      totalPointsEarned += pointsForQuestion;
       
      

      allAnswers.push({
        questionId: question._id,
        selectedAnswer: selectedAnswers[question._id] || null,
        correct: isCorrect,
        points: pointsForQuestion,
        possiblePoints: question.rewardPoints || 10,
      });
    });

    setAnswers(allAnswers);
    setQuizCompleted(true);
    updateLoyaltyPoints(totalPointsEarned)
    console.log("Total Points Earned:", totalPointsEarned);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const calculateStats = () => {
    const totalQuestions = answers.length;
    const correctAnswers = answers.filter((a) => a.correct).length;
    const timeSpent = TOTAL_TIME - timeLeft;
    const pointsEarned = answers.reduce((acc, curr) => acc + curr.points, 0);
    const totalPossiblePoints = answers.reduce(
      (acc, curr) => acc + curr.possiblePoints,
      0
    );

    return {
      totalQuestions,
      correctAnswers,
      accuracy: ((correctAnswers / totalQuestions) * 100).toFixed(1),
      timeSpent: formatTime(timeSpent),
      pointsEarned,
      totalPossiblePoints,
    };
  };

  async function updateLoyaltyPoints(totalPointsEarned) {
    try {
      const response = await fetch("http://localhost:5472/services/updateLoyaltyPoints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: parseInt(localStorage.getItem("student_id")),
          loyaltyPointsEarned:  totalPointsEarned,
          college_id :parseInt(localStorage.getItem("college_id"))
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.success) {
        console.log("Loyalty points updated successfully:", data.message);
        return data;
      } else {
        console.error("Loyalty points update failed:", data.message);
        return data;
      }
  
    } catch (error) {
      console.error("Error updating loyalty points:", error);
      return {success: false, message: error.message };
    }
  }
  

  if (quizCompleted) {
    const stats = calculateStats();
    return (
      <>
        {showConfetti && <Confetti />}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto p-6"
        >
          <Card className="bg-white ">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <IoMdCheckmarkCircleOutline className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Quiz Completed!
                </h2>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <RiCopperCoinFill className="w-6 h-6 text-yellow-500" />
                  <span className="text-xl font-bold text-[#b3206f]">
                    {stats.pointsEarned} points earned!
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-green-50 to-green-100">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-green-700">
                      {stats.accuracy}%
                    </h3>
                    <p className="text-green-600">Accuracy</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-blue-700">
                      {stats.correctAnswers}/{stats.totalQuestions}
                    </h3>
                    <p className="text-blue-600">Correct Answers</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-yellow-700">
                      {stats.pointsEarned}
                    </h3>
                    <p className="text-yellow-600">Points Earned</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 space-y-4">
                <Button
                  className="w-full bg-[#b3206f] hover:bg-[#98185e] text-white"
                  onClick={() => {
                    navigate("/course-student");
                  }}
                >
                  <span>Enroll in Courses</span>
                  <MdArrowOutward className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.location.reload()}
                >
                  Retake Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </>
    );
  }

  return (
    <div className="mx-auto">
      <div className="assistant-about flex items-center justify-around mx-auto">
        <div className="bg-gradient-to-t from-[#262b30] via-[#262b30] to-[#262b30] w-full h-64 relative">
          <div className="flex items-center justify-between">
            <svg
              width="187"
              height="175"
              viewBox="0 0 187 175"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.1">
                <path
                  d="M181.936 158.635C198.84 140.288 197.138 116.728 197.084 116.459V44.7923C197.084 42.4164 196.141 40.1378 194.461 38.4578C192.781 36.7778 190.502 35.834 188.126 35.834H134.376C124.495 35.834 116.459 43.8696 116.459 53.7507V116.459C116.459 118.835 117.403 121.113 119.083 122.793C120.763 124.473 123.042 125.417 125.418 125.417H152.991C152.802 129.846 151.479 134.152 149.148 137.923C144.598 145.099 136.024 149.999 123.653 152.471L116.459 153.905V179.167H125.418C150.349 179.167 169.367 172.26 181.936 158.635ZM83.3315 158.635C100.245 140.288 98.5338 116.728 98.48 116.459V44.7923C98.48 42.4164 97.5362 40.1378 95.8562 38.4578C94.1762 36.7778 91.8976 35.834 89.5217 35.834H35.7717C25.8907 35.834 17.855 43.8696 17.855 53.7507V116.459C17.855 118.835 18.7989 121.113 20.4789 122.793C22.1589 124.473 24.4375 125.417 26.8134 125.417H54.3871C54.1978 129.846 52.8746 134.152 50.544 137.923C45.9932 145.099 37.42 149.999 25.0486 152.471L17.855 153.905V179.167H26.8134C51.7444 179.167 70.7629 172.26 83.3315 158.635Z"
                  fill="white"
                ></path>
              </g>
            </svg>{" "}
            <svg
              width="111"
              height="112"
              viewBox="0 0 111 112"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.1">
                <path
                  d="M-4.93115 10.9162C-15.7028 22.6068 -14.6182 37.6198 -14.5839 37.791V83.4577C-14.5839 84.9716 -13.9825 86.4236 -12.912 87.4941C-11.8415 88.5646 -10.3896 89.166 -8.87561 89.166H25.3744C31.6707 89.166 36.7911 84.0456 36.7911 77.7493V37.791C36.7911 36.2771 36.1896 34.8251 35.1191 33.7546C34.0486 32.6841 32.5967 32.0827 31.0827 32.0827H13.5125C13.6331 29.2606 14.4763 26.5167 15.9613 24.1139C18.8612 19.5415 24.3241 16.419 32.2073 14.8435L36.7911 13.9302V-2.16731H31.0827C15.1964 -2.16731 3.07764 2.23381 -4.93115 10.9162ZM57.9005 10.9162C47.1231 22.6068 48.2134 37.6198 48.2477 37.791V83.4577C48.2477 84.9716 48.8491 86.4236 49.9196 87.4941C50.9901 88.5646 52.4421 89.166 53.956 89.166H88.206C94.5023 89.166 99.6227 84.0456 99.6227 77.7493V37.791C99.6227 36.2771 99.0213 34.8251 97.9507 33.7546C96.8802 32.6841 95.4283 32.0827 93.9143 32.0827H76.3441C76.4647 29.2606 77.3079 26.5167 78.793 24.1139C81.6928 19.5415 87.1557 16.419 95.0389 14.8435L99.6227 13.9302V-2.16731H93.9143C78.0281 -2.16731 65.9093 2.23381 57.9005 10.9162Z"
                  fill="white"
                ></path>
              </g>
            </svg>
          </div>

          <div className="faculty-intro-card bg-[#262b30] max-w-[1250px] h-80 mx-auto absolute left-0 right-0 top-5 overflow-hidden rounded-b-2xl">
            <div className="p-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#3b4044] p-5 rounded-lg border-gray-600 border relative transition-all duration-300 group">
                  <p className="text-gray-200 text-xs">Total Questions</p>
                  <div className="flex items-center justify-between pt-3">
                    <h1 className="text-white text-2xl pr-4">
                      {questions.length}
                    </h1>
                    <div className="bg-yellow-500 p-1 rounded-md">
                      <TbMedal className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <MdArrowOutward className="absolute top-2 right-2 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-white transition-opacity duration-300" />
                </div>

                <div className="bg-[#3b4044] p-5 rounded-lg border-gray-600 border relative transition-all duration-300 group">
                  <p className="text-gray-200 text-xs">Time Remaining</p>
                  <div className="flex items-center justify-between pt-3">
                    <h1 className="text-white text-2xl pr-4">
                      {formatTime(timeLeft)}
                    </h1>
                    <div className="bg-blue-500 p-1 rounded-md">
                      <FiClock className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <Progress
                    value={(timeLeft / TOTAL_TIME) * 100}
                    className="mt-4 bg-[#5c656c81] [&>div]:bg-[#e4e3e3ac]"
                  />
                </div>

                <div className="bg-[#3b4044] p-5 rounded-lg border-gray-600 border relative transition-all duration-300 group">
                  <p className="text-gray-200 text-xs">Questions Answered</p>
                  <div className="flex items-center justify-between pt-3">
                    <h1 className="text-white text-2xl pr-4">
                      {Object.keys(selectedAnswers).length}
                    </h1>
                    <div className="bg-green-500 p-1 rounded-md">
                      <IoMdCheckmarkCircleOutline className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-[#3b4044] p-5 rounded-lg border-gray-600 border relative transition-all duration-300 group">
                  <p className="text-gray-200 text-xs">
                    Total Points Available
                  </p>
                  <div className="flex items-center justify-between pt-3">
                    <h1 className="text-white text-2xl pr-4">
                      {questions.reduce((sum, q) => sum + (q.rewardPoints || 10), 0)}
                    </h1>
                    <div className="bg-yellow-500 p-1 rounded-md">
                      <RiCopperCoinFill className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Header with timer and subject selection */}
              <div className="bg-[#3b404446] rounded-lg mb-6">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <Select
                      value={selectedSubject}
                      onValueChange={(value) => setSelectedSubject(value)}
                    >
                      <SelectTrigger className="w-[180px] bg-[#c8e7fd] text-black">
                        <SelectValue placeholder="Select Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-white">
                      <FiClock className="w-5 h-5" />
                      <span className="font-medium">
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                    <Button
                      className="bg-[#c8e7fd] hover:bg-[#c8e7fd] rounded-full text-black"
                      onClick={handleSubmitQuiz}
                    >
                      Submit Quiz
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Questions display */}
      {loading ? (
        <div className="text-center mt-32">Loading questions...</div>
      ) : error ? (
        <div className="text-center mt-32 text-red-500">{error}</div>
      ) : (
        <div className="space-y-6 mt-32 mx-10">
          {questions.map((question) => (
            <Card key={question._id} className="bg-[#efefef] border-none text-black">
              <CardHeader className="bg-[#d4d4d4] text-black font-medium my-3 rounded-t-lg">
                <h2 className="text-xl">{question.subject_name}</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{question.question}</h3>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 rounded-full px-5 py-[6px] bg-[#008d00]">
                        <span className="text-white text-xs">MCQ</span>
                      </span>
                      <span className="flex items-center gap-1 rounded-full px-2 bg-[#1d68bd] py-[6px]">
                        <RiCopperCoinFill className="text-yellow-400" />
                        <span className="text-white font-medium text-xs">
                          {question.rewardPoints || 10} points
                        </span>
                      </span>
                    </div>
                  </div>
                  <RadioGroup className="space-y-4">
                    {question.options.map((option) => (
                      <div
                        key={option.key}
                        className={`relative flex w-full items-start gap-2 rounded-lg p-4 cursor-pointer transition-all duration-200 border border-[#cccccc] ${
                          selectedAnswers[question._id] === option.key
                            ? "border-[#b3206f] bg-[#b3206f]/10 text-black"
                            : "border-gray-600 hover:bg-gray-200"
                        }`}
                        onClick={() => handleOptionSelect(question._id, option.key)}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              selectedAnswers[question._id] === option.key
                                ? "border-[#b3206f] bg-[#b3206f]"
                                : "border-gray-600"
                            }`}
                          >
                            {selectedAnswers[question._id] === option.key && (
                              <div className="w-full h-full rounded-full bg-white transform scale-50" />
                            )}
                          </div>
                          <span>{option.value}</span>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionSheet;