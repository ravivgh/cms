import FacultySidebar from "@/components/FacultySidebar";
import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { VscVerifiedFilled } from "react-icons/vsc";
import { SiGoogleclassroom } from "react-icons/si";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdModeEdit, MdSave, MdCancel } from "react-icons/md";
import { useForm } from "react-hook-form";

const MainFacultyProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [profileData, setProfileData] = useState({
    Staff_name: "",
    Staff_Email: "",
    Assigned_Class: "",
    Section: "",
    Mob: "",
    Subject: "",
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
    const fetchProfileData = async () => {
      try {
        const staffId = localStorage.getItem("staff_id");
        if (!staffId) {
          console.error("Staff ID not found in local storage.");
          return;
        }

        const response = await fetch(
          "http://localhost:5472/services/getstaffdetails",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sid: staffId }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setProfileData(data.values);
        reset(data.values);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, [reset]);

  const handleSidebarToggle = () => setIsSidebarOpen(!isSidebarOpen);
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    reset(profileData);
  };

  const onSubmit = async (data) => {
    try {
      const staffId = localStorage.getItem("staff_id");
      const response = await fetch(
        "http://localhost:5472/services/updatestaffdetails",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sid: staffId, ...data }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile data");
      }
      setProfileData(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(
      (file) =>
        ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type) &&
        file.size <= 10 * 1024 * 1024
    );
    setUploadedFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="">
      <FacultySidebar isSidebarOpen={isSidebarOpen} onToggle={handleSidebarToggle} />
      <main className={`p-4 transition-all duration-500 ${isSidebarOpen ? "ml-[12.5rem]" : "ml-[5rem]"}`} style={{ width: isSidebarOpen ? "calc(100% - 12.5rem)" : "calc(100% - 5rem)" }}>
        <div className="max-w-7xl mx-auto flex space-x-5 justify-center items-center">
          <div className="">
            <motion.div className="bg-gradient-to-r bg-[#f1ce8b] rounded-xl p-8 mb-8">
              <div className="flex items-center gap-6 flex-col">
                <motion.div>
                  <Avatar alt={profileData.Staff_name} src={`http://localhost:5472/profilepics/${localStorage.getItem("staff_id")}.png`} sx={{ width: 300, height: 300, borderRadius: "7px" }} className="rounded-2xl" />
                </motion.div>
                <div className="text-white">
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-medium text-black">{profileData.Staff_name}</h1>
                    <VscVerifiedFilled className="text-[#3b9656]" />
                  </div>
                  <p className="text-gray-600">{profileData.Staff_Email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <SiGoogleclassroom className="text-yellow-800" />
                    <span className="text-gray-800">{profileData.Assigned_Class} {profileData.Section}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <Input {...register("Staff_name", { required: "Name is required" })} readOnly={!isEditing} className={`${errors.Staff_name ? "border-red-500" : ""} ${!isEditing ? "bg-gray-50" : "bg-white"}`} />
                      {errors.Staff_name && <p className="text-red-500 text-xs mt-1">{errors.Staff_name.message}</p>}
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input {...register("Staff_Email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" } })} readOnly={!isEditing} className={`${errors.Staff_Email ? "border-red-500" : ""} ${!isEditing ? "bg-gray-50" : "bg-white"}`} />
                      {errors.Staff_Email && <p className="text-red-500 text-xs mt-1">{errors.Staff_Email.message}</p>}
                    </div>
                    <div>
                      <Label>Assigned Class</Label>
                      <Input {...register("Assigned_Class", { required: "Assigned Class is required" })} readOnly={!isEditing} className={`${errors.Assigned_Class ? "border-red-500" : ""} ${!isEditing ? "bg-gray-50" : "bg-white"}`} />
                      {errors.Assigned_Class && <p className="text-red-500 text-xs mt-1">{errors.Assigned_Class.message}</p>}
                    </div>
                    <div>
                      <Label>Section</Label>
                      <Input {...register("Section", { required: "Section is required" })} readOnly={!isEditing} className={`${errors.Section ? "border-red-500" : ""} ${!isEditing ? "bg-gray-50" : "bg-white"}`} />
                      {errors.Section && <p className="text-red-500 text-xs mt-1">{errors.Section.message}</p>}
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <Input {...register("Mob", { required: "Phone number is required", pattern: { value: /^\+?[\d\s-]{10,}$/, message: "Invalid phone number" } })} readOnly={!isEditing} className={`${errors.Mob ? "border-red-500" : ""} ${!isEditing ? "bg-gray-50" : "bg-white"}`} />
                      {errors.Mob && <p className="text-red-500 text-xs mt-1">{errors.Mob.message}</p>}
                    </div>
                    <div>
                      <Label>Subject</Label>
                      <Input {...register("Subject", { required: "Subject is required" })} readOnly={!isEditing} className={`${errors.Subject ? "border-red-500" : ""} ${!isEditing ? "bg-gray-50" : "bg-white"}`} />
                      {errors.Subject && <p className="text-red-500 text-xs mt-1">{errors.Subject.message}</p>}
                    </div>
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
                  <input type="file" className="hidden" id="document-upload" multiple accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
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
                      <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between bg-gray-50 p-2 rounded">
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
  );
};

export default MainFacultyProfile;