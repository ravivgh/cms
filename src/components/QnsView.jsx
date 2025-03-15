import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  FiClock,
  FiCalendar,
  FiDownload,
  FiEye,
  FiEdit,
  FiTrendingUp,
} from "react-icons/fi";
import { Progress } from "@/components/ui/progress";
import { RiCopperCoinFill } from "react-icons/ri";
import Sidebar from "../components/Sidebar";

const QnsView = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [scheduleDate, setScheduleDate] = useState(new Date());
  const [showHistory, setShowHistory] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [showPreview, setShowPreview] = useState(null);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "Basic Mathematics",
      status: "Active",
      scheduledDate: "2025-03-10 10:00 AM",
      totalQuestions: 2,
      totalPoints: 15,
      studentCompletion: 75,
      averageScore: 12,
      difficultyDistribution: { easy: 1, medium: 1, hard: 0 },
      questions: [
        { id: 1, question: "What is 2 + 2?", points: 5, difficulty: "easy" },
        { id: 2, question: "What is 5 × 5?", points: 10, difficulty: "medium" },
      ],
      history: [
        { date: "2025-03-01", avgScore: 11, completion: 60 },
        { date: "2025-02-15", avgScore: 10, completion: 55 },
      ],
      studentStats: [
        {
          id: 1,
          name: "John Doe",
          score: 13,
          completed: true,
          timeTaken: "8:45",
        },
        {
          id: 2,
          name: "Jane Smith",
          score: 10,
          completed: true,
          timeTaken: "9:30",
        },
      ],
    },
    {
      id: 2,
      title: "General Knowledge",
      status: "Draft",
      scheduledDate: null,
      totalQuestions: 2,
      totalPoints: 35,
      studentCompletion: 0,
      averageScore: 0,
      difficultyDistribution: { easy: 0, medium: 1, hard: 1 },
      questions: [
        {
          id: 3,
          question: "What is the capital of France?",
          points: 15,
          difficulty: "medium",
        },
        {
          id: 4,
          question: "Which planet is known as the Red Planet?",
          points: 20,
          difficulty: "hard",
        },
      ],
      history: [],
      studentStats: [],
    },
  ]);

  const handleScheduleQuiz = (quizId, date) => {
    setQuizzes((prevQuizzes) =>
      prevQuizzes.map((quiz) =>
        quiz.id === quizId
          ? { ...quiz, scheduledDate: date.toISOString() }
          : quiz
      )
    );
    setSelectedQuiz(null);
  };

  const handleStatusChange = (quizId, newStatus) => {
    setQuizzes((prevQuizzes) =>
      prevQuizzes.map((quiz) =>
        quiz.id === quizId ? { ...quiz, status: newStatus } : quiz
      )
    );
  };

  const exportResults = (quizId) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz) return;

    // Prepare CSV content
    let csvContent = "data:text/csv;charset=utf-8,";

    // Add quiz metadata
    csvContent += `Quiz Title,${quiz.title}\n`;
    csvContent += `Status,${quiz.status}\n`;
    csvContent += `Scheduled Date,${formatDateTime(quiz.scheduledDate)}\n`;
    csvContent += `Total Questions,${quiz.totalQuestions}\n`;
    csvContent += `Total Points,${quiz.totalPoints}\n`;
    csvContent += `Average Score,${quiz.averageScore}\n`;
    csvContent += `Student Completion,${quiz.studentCompletion}%\n\n`;

    // Add student stats header
    csvContent += "Student Name,Score,Completed,Time Taken\n";

    // Add student stats data
    quiz.studentStats.forEach((student) => {
      csvContent += `${student.name},${student.score},${
        student.completed ? "Yes" : "No"
      },${student.timeTaken}\n`;
    });

    // Create and trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${quiz.title}_results.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const bulkSchedule = () => {
    if (selectedQuizzes.length === 0) {
      window.alert("Please select at least one quiz to schedule.");
      return;
    }

    // Show confirmation popup
    const confirmSchedule = window.confirm(
      `Are you sure you want to schedule ${selectedQuizzes.length} quiz${
        selectedQuizzes.length > 1 ? "zes" : ""
      } for ${formatDateTime(scheduleDate)}?`
    );

    if (confirmSchedule) {
      // Update quizzes
      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) =>
          selectedQuizzes.includes(quiz.id)
            ? { ...quiz, scheduledDate: scheduleDate.toISOString() }
            : quiz
        )
      );
      setSelectedQuizzes([]);

      // Show success alert
      window.alert(
        `${selectedQuizzes.length} quiz${
          selectedQuizzes.length > 1 ? "zes" : ""
        } ha${
          selectedQuizzes.length > 1 ? "ve" : "s"
        } been successfully scheduled for ${formatDateTime(scheduleDate)}!`
      );
    }
  };

  const toggleQuizSelection = (quizId) => {
    setSelectedQuizzes((prev) =>
      prev.includes(quizId)
        ? prev.filter((id) => id !== quizId)
        : [...prev, quizId]
    );
  };

  const formatDateTime = (date) => {
    return date
      ? new Date(date).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "Not Scheduled";
  };

  const toggleHistory = (quiz) => {
    setShowHistory(!showHistory);
    setSelectedHistory(quiz);
  };

  const togglePreview = (quiz) => {
    setShowPreview(showPreview?.id === quiz.id ? null : quiz);
  };
  return (
    <>
      <div className="flex">
        <Sidebar isSidebarOpen={isSidebarOpen} onToggle={handleSidebarToggle} />
        <main
          className={`transition-all duration-500 ${
            isSidebarOpen ? "ml-[12.5rem]" : "ml-[5rem]"
          }`}
          style={{
            width: isSidebarOpen ? "calc(100% - 12.5rem)" : "calc(100% - 5rem)",
          }}
        >
          <div className="mx-auto">
            <div className="faculty-dashboard flex items-center justify-around mx-auto">
              <div className="bg-gradient-to-t from-[#262b30] via-[#262b30] to-[#262b30] w-full h-64 relative">
                <div className="faculty-control-card bg-[#262b30] max-w-[1250px] h-80 mx-auto absolute left-0 right-0 top-5 overflow-hidden rounded-b-2xl">
                  <div className="p-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-[#3b4044] p-5 rounded-lg border-gray-600 border">
                        <p className="text-gray-200 text-xs">Total Quizzes</p>
                        <h1 className="text-white text-2xl pt-3">
                          {quizzes.length}
                        </h1>
                      </div>
                      <div className="bg-[#3b4044] p-5 rounded-lg border-gray-600 border">
                        <p className="text-gray-200 text-xs">Active Quizzes</p>
                        <h1 className="text-white text-2xl pt-3">
                          {quizzes.filter((q) => q.status === "Active").length}
                        </h1>
                      </div>
                      <div className="bg-[#3b4044] p-5 rounded-lg border-gray-600 border">
                        <p className="text-gray-200 text-xs">Avg. Completion</p>
                        <h1 className="text-white text-2xl pt-3">
                          {Math.round(
                            quizzes.reduce(
                              (sum, q) => sum + q.studentCompletion,
                              0
                            ) / quizzes.length
                          ) || 0}
                          %
                        </h1>
                      </div>
                      <div className="bg-[#3b4044] p-5 rounded-lg border-gray-600 border">
                        <p className="text-gray-200 text-xs">Total Students</p>
                        <h1 className="text-white text-2xl pt-3">
                          {quizzes.reduce(
                            (sum, q) => sum + q.studentStats.length,
                            0
                          )}
                        </h1>
                      </div>
                    </div>

                    <div className="bg-[#3b404446] rounded-lg mb-6">
                      <div className="flex items-center justify-between p-4">
                        <h2 className="text-white text-xl font-medium">
                          Quiz Management Dashboard
                        </h2>
                        {selectedQuizzes.length > 0 && (
                          <div className="flex gap-2 items-center">
                            <input
                              type="datetime-local"
                              className=" rounded-lg p-2 text-white bg-slate-700"
                              value={scheduleDate.toISOString().slice(0, 16)}
                              onChange={(e) =>
                                setScheduleDate(new Date(e.target.value))
                              }
                            />
                            <Button
                              className="bg-[#b3206f] hover:bg-[#98185e] text-white"
                              onClick={bulkSchedule}
                            >
                              Schedule Selected ({selectedQuizzes.length})
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 my-32 mx-10">
              {quizzes.map((quiz) => (
                <Card
                  key={quiz.id}
                  className="bg-[#efefef] border-none text-black"
                >
                  <CardHeader className="bg-[#d4d4d4] text-black font-medium my-3 rounded-t-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedQuizzes.includes(quiz.id)}
                          onChange={() => toggleQuizSelection(quiz.id)}
                        />
                        <h2 className="text-xl">{quiz.title}</h2>
                      </div>
                      <div className="flex items-center gap-2 ">
                        <span
                          className={` text-center text-xs w-fit px-5 py-1 rounded-full ${
                            quiz.status === "Active"
                              ? "bg-green-200 text-green-800"
                              : quiz.status === "Draft"
                              ? "bg-gray-200 text-gray-800"
                              : "bg-blue-200 text-blue-800"
                          }`}
                        >
                          {quiz.status}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            onClick={() => setSelectedQuiz(quiz)}
                          >
                            <FiEdit className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => toggleHistory(quiz)}
                          >
                            <FiClock className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => togglePreview(quiz)}
                          >
                            <FiEye className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Scheduled Date</p>
                        <div className="flex items-center gap-2 mt-1">
                          <FiCalendar className="text-gray-500" />
                          <span>{formatDateTime(quiz.scheduledDate)}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          Student Completion
                        </p>
                        <Progress
                          value={quiz.studentCompletion}
                          className="mt-2 bg-[#5c656c81] [&>div]:bg-[#008d00]"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Average Score</p>
                        <span className="flex items-center gap-1 mt-1">
                          <RiCopperCoinFill className="text-yellow-400" />
                          {quiz.averageScore}/{quiz.totalPoints}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          Difficulty Distribution
                        </p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-green-600">
                            E: {quiz.difficultyDistribution.easy}
                          </span>
                          <span className="text-yellow-600">
                            M: {quiz.difficultyDistribution.medium}
                          </span>
                          <span className="text-red-600">
                            H: {quiz.difficultyDistribution.hard}
                          </span>
                        </div>
                      </div>
                    </div>

                    {selectedQuiz?.id === quiz.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-t pt-4 space-y-4"
                      >
                        <div className="flex gap-4 items-center">
                          <input
                            type="datetime-local"
                            className="border rounded-lg p-2 bg-gray-200"
                            value={scheduleDate.toISOString().slice(0, 16)}
                            onChange={(e) =>
                              setScheduleDate(new Date(e.target.value))
                            }
                          />
                          <Button
                            className="bg-[#b3206f] hover:bg-[#98185e] text-white"
                            onClick={() =>
                              handleScheduleQuiz(quiz.id, scheduleDate)
                            }
                          >
                            Schedule
                          </Button>
                        </div>
                        <div className="flex gap-4">
                          <select
                            className="border rounded-lg p-2 bg-gray-200"
                            value={quiz.status}
                            onChange={(e) =>
                              handleStatusChange(quiz.id, e.target.value)
                            }
                          >
                            <option value="Draft">Draft</option>
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                          </select>
                          <Button
                            variant="outline"
                            onClick={() => exportResults(quiz.id)}
                          >
                            <FiDownload className="mr-2" />
                            Export Results
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {quiz.studentStats.length > 0 && (
                      <div className="border-t pt-4">
                        <h3 className="font-medium mb-2">
                          Student Performance Trends
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">
                              Performance Heatmap
                            </p>
                            <div className="mt-2 grid grid-cols-5 gap-1">
                              {quiz.studentStats.map((student, idx) => (
                                <div
                                  key={idx}
                                  className="h-6 w-6 rounded"
                                  style={{
                                    backgroundColor: `rgba(178, 32, 111, ${
                                      student.score / quiz.totalPoints
                                    })`,
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Score Distribution
                            </p>
                            <Progress
                              value={
                                (quiz.averageScore / quiz.totalPoints) * 100
                              }
                              className="mt-2 bg-[#5c656c81] [&>div]:bg-[#b3206f]"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {showPreview?.id === quiz.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-t pt-4"
                      >
                        <h3 className="font-medium mb-2">Quiz Preview</h3>
                        <div className="space-y-2">
                          {quiz.questions.map((q) => (
                            <div key={q.id} className="p-2 bg-gray-100 rounded">
                              <p>{q.question}</p>
                              <p className="text-sm text-gray-600">
                                {q.points} points - {q.difficulty}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {showHistory && selectedHistory && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center"
              >
                <Card className="bg-white w-[600px] max-h-[80vh] overflow-auto">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-medium">
                        {selectedHistory.title} History
                      </h2>
                      <Button
                        variant="ghost"
                        onClick={() => setShowHistory(false)}
                      >
                        ✕
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {selectedHistory.history.length > 0 ? (
                      <div className="space-y-4">
                        {selectedHistory.history.map((entry, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-2 border-b"
                          >
                            <span>{formatDateTime(entry.date)}</span>
                            <div className="flex gap-4">
                              <span>Avg: {entry.avgScore}</span>
                              <span>Completion: {entry.completion}%</span>
                              <FiTrendingUp className="text-gray-600" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No history available for this quiz.</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default QnsView;
