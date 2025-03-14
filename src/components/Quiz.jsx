import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Users, Book, Plus } from "lucide-react";
import { IoMdArrowRoundUp } from "react-icons/io";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { RiCopperCoinFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";

const Assistant = () => {
  const [classData, setClassData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [numQuestions, setNumQuestions] = useState(4);
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rewardPoints, setRewardPoints] = useState({});
  const messageEndRef = useRef(null);

  const [openSubMenus, setOpenSubMenus] = useState({
    classIndex: null,
    sectionIndex: null,
  });

  useEffect(() => {
    async function fetchClassData() {
      try {
        const response = await axios.post("http://localhost:5472/services/getclassarray");
        if (response.status === 200 && response.data) {
          setClassData(response.data);
        }
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    }
    fetchClassData();
  }, []);

  const handleGenerateMCQs = async (e) => {
    e.preventDefault();

    if (!selectedClass || !selectedSection || !selectedSubject) {
      alert("Please select Class, Section, and Subject before generating MCQs.");
      return;
    }

    if (!inputValue.trim()) {
      alert("Please enter content before submitting.");
      return;
    }

    setLoading(true);
    setMcqs([]);

    try {
      const response = await axios.post("http://localhost:5472/services/generate-mcqs", {
        Cid: selectedClass,
        section_id: selectedSection,
        subject: selectedSubject,
        content: inputValue,
        date: new Date().toISOString().split("T")[0],
        college_id: localStorage.getItem("college_id"),
        noq: numQuestions,
      });

      if (response.status === 200 && response.data.questions) {
        const questionsWithIds = response.data.questions.questions.map((question) => ({
          ...question,
          id: uuidv4(),
        }));
        setMcqs(questionsWithIds);

        const defaultRewards = questionsWithIds.reduce((acc, question, index) => {
          acc[question.id] = 10;
          return acc;
        }, {});
        setRewardPoints(defaultRewards);
      } else {
        alert("Failed to generate MCQs. Please try again.");
      }
    } catch (error) {
      console.error("Error generating MCQs:", error);
      alert("An error occurred while generating MCQs.");
    }

    setLoading(false);
    setInputValue("");
    scrollToBottom();
  };

  const handleSaveMCQs = async () => {
    if (mcqs.length === 0) {
      alert("No MCQs to save. Please generate MCQs first.");
      return;
    }

    const formattedMcqs = mcqs.map((mcq) => ({
      id: mcq.id,
      question: mcq.question,
      options: mcq.options,
      answer: mcq.answer,
      rewardPoints: rewardPoints[mcq.id] || 10,
    }));

    try {
      const response = await axios.post("http://localhost:5472/services/save-mcqs", {
        Cid: selectedClass,
        section_id: selectedSection,
        subject: selectedSubject,
        questions: formattedMcqs,
        date: new Date().toISOString().split("T")[0],
        college_id: parseInt(localStorage.getItem("college_id")),
      });

      if (response.status === 200) {
        alert("MCQs saved successfully!");
        setMcqs([]);
        setRewardPoints({});
      } else {
        alert("Failed to save MCQs.");
      }
    } catch (error) {
      console.error("Error saving MCQs:", error);
      alert("An error occurred while saving MCQs.");
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="w-full flex justify-center bg-[#2b2d42] py-10">
        <div className="max-w-[1200px] w-full text-white text-center">
          <h1 className="text-3xl font-semibold">Campus Quiz Quest</h1>
          <p className="mt-2 text-gray-300">Engaging quizzes for better learning!</p>
        </div>
      </div>

      <div className="container mx-auto max-w-[900px] mt-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full bg-black text-white rounded-full">
              {selectedSubject
                ? `${selectedClass} - ${selectedSection} - ${selectedSubject}`
                : "Select Class"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Classes</DropdownMenuLabel>
            {classData.map((classItem, classIndex) => (
              <DropdownMenuSub key={classIndex}>
                <DropdownMenuSubTrigger
                  onClick={() => {
                    setOpenSubMenus({ classIndex, sectionIndex: null });
                    setSelectedClass(classItem.Class);
                  }}
                >
                  <Users className="mr-2 h-4 w-4" />
                  <span>{classItem.Class}</span>
                </DropdownMenuSubTrigger>
                {openSubMenus.classIndex === classIndex && (
                  <DropdownMenuSubContent>
                    {classItem.Sections.map((section, sectionIndex) => (
                      <DropdownMenuSub key={sectionIndex}>
                        <DropdownMenuSubTrigger
                          onClick={() => {
                            setOpenSubMenus({
                              classIndex,
                              sectionIndex,
                            });
                            setSelectedSection(section.Section);
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          <span>Section {section.Section}</span>
                        </DropdownMenuSubTrigger>
                        {openSubMenus.classIndex === classIndex &&
                          openSubMenus.sectionIndex === sectionIndex && (
                            <DropdownMenuSubContent>
                              {section.Subjects.map((subject, subjectIndex) => (
                                <DropdownMenuItem
                                  key={subjectIndex}
                                  onClick={() => setSelectedSubject(subject)}
                                >
                                  <Book className="mr-2 h-4 w-4" />
                                  <span>{subject}</span>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          )}
                      </DropdownMenuSub>
                    ))}
                  </DropdownMenuSubContent>
                )}
              </DropdownMenuSub>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Textarea
          className="mt-5 text-black"
          placeholder="Enter content..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <Button
          className="mt-3 w-full bg-blue-500 text-white rounded-full flex items-center justify-center"
          onClick={handleGenerateMCQs}
        >
          <IoMdArrowRoundUp className="text-lg" /> Generate MCQs
        </Button>

        {mcqs.length > 0 && (
          <>
            {mcqs.map((mcq) => (
              <Card key={mcq.id} className="p-4">
              <CardHeader>
                <p className="text-lg font-semibold">{mcq.question}</p>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue={mcq.answer}>
                  {Object.entries(mcq.options).map(([key, option]) => (
                    <div key={key} className="flex items-center gap-2 p-2 border rounded-lg">
                      <RadioGroupItem value={key} />
                      <Label>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex items-center gap-2 mt-3">
                  <p className="text-gray-600">Loyalty Points:</p>
                  <input
                    type="number"
                    min="1"
                    className="border p-1 rounded w-16 text-center"
                    value={rewardPoints[mcq.id]}
                    onChange={(e) =>
                      setRewardPoints({
                        ...rewardPoints,
                        [mcq.id]: e.target.value,
                      })
                    }
                  />
                  <RiCopperCoinFill className="text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            className="mt-3 w-full bg-green-500 text-white rounded-full"
            onClick={handleSaveMCQs}
          >
            Save MCQs
          </Button>
        </>
      )}
    </div>
  </>
);
};

export default Assistant;