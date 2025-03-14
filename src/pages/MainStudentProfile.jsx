import StudentSidebar from "@/components/StudentSidebar";
import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { VscVerifiedFilled } from "react-icons/vsc";
import { RiCopperCoinFill } from "react-icons/ri";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdModeEdit, MdSave, MdCancel } from "react-icons/md";
import { useForm } from "react-hook-form";

const MainStudentProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    studentId: "",
    class: "",
    section: "",
    phone: "",
    address: "",
    points: 0,
    completedCourses: 0,
    ongoingCourses: 0,
    total_rewards :0
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: profileData,
  });

  useEffect(() => {
    const fetchStudentDetails = async () => {
      const studentId = localStorage.getItem("student_id");

      if (!studentId) {
        setError("Please log in to view your profile.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5472/services/getstudentdetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sid: parseInt(studentId) }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.values) {
          setProfileData((prevData) => ({
            ...prevData,
            Student_Name: data.values.Student_Name || prevData.name,
            Email: data.values.Email || prevData.email,
            _id: data.values._id || prevData.studentId,
            Class: data.values.Class || prevData.class,
            Section: data.values.Section || prevData.section,
            Mobile: data.values.Mobile || prevData.phone,
            points: data.values.total_rewards || prevData.points,
            completedCourses: data.values.CompletedCourses || prevData.completedCourses,
            ongoingCourses: data.values.OngoingCourses || prevData.ongoingCourses,
          }));
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch student details.");
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, []);

  useEffect(() => {
    if (profileData && Object.keys(profileData).length > 0) {
      reset(profileData);
    }
  }, [profileData, reset]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleEdit = () => {
    setIsEditing(true);
    reset(profileData);
  };

  const onSubmit = async (data) => {
    const studentId = localStorage.getItem("student_id");
    try {
      const response = await fetch("http://localhost:5472/services/updatestudentdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sid: parseInt(studentId), updatedData: data }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setProfileData(data);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError("Failed to update student details.");
      console.error("Error updating student details:", err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset(profileData);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB

    const validFiles = files.filter((file) => {
      const isValidType = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type);
      const isValidSize = file.size <= maxSize;

      return isValidType && isValidSize;
    });

    setUploadedFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-semibold">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="">
        <StudentSidebar isSidebarOpen={isSidebarOpen} onToggle={handleSidebarToggle} />
        <main
          className={`p-4 transition-all duration-500 ${isSidebarOpen ? "ml-[12.5rem]" : "ml-[5rem]"}`}
          style={{ width: isSidebarOpen ? "calc(100% - 12.5rem)" : "calc(100% - 5rem)" }}
        >
          <div className="max-w-7xl mx-auto flex space-x-5 justify-center items-center">
            <div className="">
              <motion.div className="bg-gradient-to-r bg-[#d3ebd3] rounded-xl p-8 mb-8 ">
                <div className="flex items-center gap-6 flex-col">
                  <motion.div>
                    <Avatar
                      alt={profileData.Student_Name}
                      src={`http://localhost:5472/profilepics/${localStorage.getItem("student_id")}.png`}
                      sx={{ width: 300, height: 300, borderRadius: "7px" }}
                      className="rounded-2xl"
                    />
                  </motion.div>
                  <div className="text-white">
                    <div className="flex items-center gap-2">
                      <h1 className="text-3xl font-medium text-black">{profileData.Student_Name}</h1>
                      <VscVerifiedFilled className="text-[#6fb974] text-2xl" />
                    </div>
                    <p className="text-gray-500">{profileData.Email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <RiCopperCoinFill className="text-yellow-500" />
                      <span className="text-gray-700">{profileData.points} Points Earned</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br  border border-[#b2b2b2]">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-green-700">{profileData.completedCourses}</h3>
                  <p className="text-green-600 bg-[#d3ebd3] w-fit px-2 py-1 rounded-full text-sm">Completed Courses</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br border border-[#b2b2b2]">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-[#1c68bd]">{profileData.ongoingCourses}</h3>
                  <p className="text-white bg-[#1c68bd] w-fit px-2 py-1 rounded-full text-sm">Ongoing Courses</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br border border-[#b2b2b2]">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-yellow-600">{profileData.points}</h3>
                  <p className="text-white bg-[#000000] w-fit px-2 py-1 rounded-fulltext-sm">Total Points</p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row justify-between items-center">
                  <h2 className="text-xl font-semibold">Profile Details</h2>
                  {!isEditing ? (
                    <Button onClick={handleEdit} variant="outline" className="flex items-center gap-2">
                      <MdModeEdit /> Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleSubmit(onSubmit)} className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
                        <MdSave /> Save
                      </Button>
                      <Button onClick={handleCancel} variant="outline" className="flex items-center gap-2">
                        <MdCancel /> Cancel
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Name</Label>
                        <Input
                          {...register("Student_Name", { required: "Name is required" })}
                          readOnly={!isEditing}
                          className={`${errors.name ? "border-red-500" : ""} ${!isEditing ? "bg-gray-50" : "bg-white"}`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>

                      <div>
                        <Label>Email</Label>
                        <Input
                          {...register("Email", {
                            required: "Email is required",
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" },
                          })}
                          readOnly={!isEditing}
                          className={`${errors.email ? "border-red-500" : ""} ${!isEditing ? "bg-gray-50" : "bg-white"}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.Email.message}</p>}
                      </div>

                      <div>
                        <Label>Phone Number</Label>
                        <Input
                          {...register("Mobile", {
                            required: "Phone number is required",
                            pattern: { value: /^\+?[\d\s-]{10,}$/, message: "Invalid phone number" },
                          })}
                          readOnly={!isEditing}
                          className={`${errors.phone ? "border-red-500" : ""} ${!isEditing ? "bg-gray-50" : "bg-white"}`}
                        />
                        {errors.Mobile && <p className="text-red-500 text-xs mt-1">{errors.Mobile.message}</p>}
                      </div>

                      <div>
                        <Label>Class</Label>
                        <Input
                          {...register("Class", { required: "Class is required" })}
                          readOnly={!isEditing}
                          className={`${errors.class ? "border-red-500" : ""} ${!isEditing ? "bg-gray-50" : "bg-white"}`}
                        />
                        {errors.class && <p className="text-red-500 text-xs mt-1">{errors.class.message}</p>}
                      </div>

                      <div>
                        <Label>Section</Label>
                        <Input
                          {...register("Section", { required: "Section is required" })}
                          readOnly={!isEditing}
                          className={`${errors.section ? "border-red-500" : ""} ${!isEditing ? "bg-gray-50" : "bg-white"}`}
                        />
                        {errors.section && <p className="text-red-500 text-xs mt-1">{errors.section.message}</p>}
                      </div>

                      <div className="col-span-2"></div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Documents</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      className="hidden"
                      id="document-upload"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                    />
                    <label htmlFor="document-upload" className="flex flex-col items-center gap-3 cursor-pointer">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <IoCloudUploadOutline className="h-10 w-10 text-blue-600" />
                      </motion.div>
                      <div className="text-sm text-gray-600">
                        <span className="text-blue-600 font-semibold">Click to upload</span> or drag and drop
                        <p className="text-xs text-gray-500">PDF or Word documents (max 10MB)</p>
                      </div>
                    </label>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-medium">Uploaded Files</h3>
                      {uploadedFiles.map((file, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between bg-gray-50 p-2 rounded"
                        >
                          <span className="truncate">{file.name}</span>
                          <Button variant="ghost" size="sm" onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">
                            Remove
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MainStudentProfile;