import StudentSidebar from "@/components/StudentSidebar";
import { useState } from "react";
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

  const [profileData, setProfileData] = useState({
    name: "Meet Smith",
    email: "meet.smith@example.com",
    studentId: "ST2024001",
    class: "FY",
    section: "A",
    phone: "+91 9876543210",
    address: "123 Student Housing, College Road",
    points: 150,
    completedCourses: 3,
    ongoingCourses: 2,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: profileData,
  });

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleEdit = () => {
    setIsEditing(true);
    reset(profileData);
  };

  const onSubmit = (data) => {
    setProfileData(data);
    setIsEditing(false);
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

  return (
    <>
      <div className="">
        <StudentSidebar
          isSidebarOpen={isSidebarOpen}
          onToggle={handleSidebarToggle}
        />
        <main
          className={`p-4 transition-all duration-500 ${
            isSidebarOpen ? "ml-[12.5rem]" : "ml-[5rem]"
          }`}
          style={{
            width: isSidebarOpen ? "calc(100% - 12.5rem)" : "calc(100% - 5rem)",
          }}
        >
          <div className="max-w-7xl mx-auto flex space-x-5 justify-center items-center">
            {/* Profile Header */}
            <div className="">
              <motion.div
                className="bg-gradient-to-r bg-[#d3ebd3] rounded-xl p-8 mb-8 "
                // initial={{ opacity: 0, y: -20 }}
                // animate={{ opacity: 1, y: 0 }}
                // transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-6 flex-col">
                  <motion.div
                  // initial={{ scale: 0.5, opacity: 0 }}
                  // animate={{ scale: 1, opacity: 1 }}
                  // transition={{ duration: 0.3 }}
                  >
                    <Avatar
                      alt={profileData.name}
                      src="https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/0f6fee60-187e-44ed-8ccf-e0bc3b56eeac.jpg"
                      sx={{ width: 300, height: 300, borderRadius: "7px" }}
                      className="rounded-2xl"
                    />
                  </motion.div>
                  <div className="text-white">
                    <div className="flex items-center gap-2">
                      <h1 className="text-3xl font-medium text-black">
                        {profileData.name}
                      </h1>
                      <VscVerifiedFilled className="text-[#6fb974] text-2xl" />
                    </div>
                    <p className="text-gray-500">{profileData.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <RiCopperCoinFill className="text-yellow-500" />
                      <span className="text-gray-700">
                        {profileData.points} Points Earned
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <Card className="bg-gradient-to-br  border border-[#b2b2b2]">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-green-700">
                    {profileData.completedCourses}
                  </h3>
                  <p className="text-green-600 bg-[#d3ebd3] w-fit px-2 py-1 rounded-full text-sm">
                    Completed Courses
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br border border-[#b2b2b2]">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-[#1c68bd]">
                    {profileData.ongoingCourses}
                  </h3>
                  <p className="text-white bg-[#1c68bd] w-fit px-2 py-1 rounded-full text-sm">
                    Ongoing Courses
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br border border-[#b2b2b2]">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-yellow-600">
                    {profileData.points}
                  </h3>
                  <p className="text-white bg-[#000000] w-fit px-2 py-1 rounded-full text-sm">
                    Total Points
                  </p>
                </CardContent>
              </Card>

              {/* Profile Details */}
              <Card className="md:col-span-2 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row justify-between items-center">
                  <h2 className="text-xl font-semibold">Profile Details</h2>
                  {!isEditing ? (
                    <Button
                      onClick={handleEdit}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <MdModeEdit /> Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSubmit(onSubmit)}
                        className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                      >
                        <MdSave /> Save
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
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
                          {...register("name", {
                            required: "Name is required",
                          })}
                          readOnly={!isEditing}
                          className={`${errors.name ? "border-red-500" : ""} ${
                            !isEditing ? "bg-gray-50" : "bg-white"
                          }`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label>Email</Label>
                        <Input
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Invalid email format",
                            },
                          })}
                          readOnly={!isEditing}
                          className={`${errors.email ? "border-red-500" : ""} ${
                            !isEditing ? "bg-gray-50" : "bg-white"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label>Phone Number</Label>
                        <Input
                          {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                              value: /^\+?[\d\s-]{10,}$/,
                              message: "Invalid phone number",
                            },
                          })}
                          readOnly={!isEditing}
                          className={`${errors.phone ? "border-red-500" : ""} ${
                            !isEditing ? "bg-gray-50" : "bg-white"
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label>Class</Label>
                        <Input
                          {...register("class", {
                            required: "Class is required",
                          })}
                          readOnly={!isEditing}
                          className={`${errors.class ? "border-red-500" : ""} ${
                            !isEditing ? "bg-gray-50" : "bg-white"
                          }`}
                        />
                        {errors.class && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.class.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label>Section</Label>
                        <Input
                          {...register("section", {
                            required: "Section is required",
                          })}
                          readOnly={!isEditing}
                          className={`${
                            errors.section ? "border-red-500" : ""
                          } ${!isEditing ? "bg-gray-50" : "bg-white"}`}
                        />
                        {errors.section && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.section.message}
                          </p>
                        )}
                      </div>

                      <div className="col-span-2">
                        <Label>Address</Label>
                        <Input
                          {...register("address", {
                            required: "Address is required",
                          })}
                          readOnly={!isEditing}
                          className={`${
                            errors.address ? "border-red-500" : ""
                          } ${!isEditing ? "bg-gray-50" : "bg-white"}`}
                        />
                        {errors.address && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.address.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Documents Section */}
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
                    <label
                      htmlFor="document-upload"
                      className="flex flex-col items-center gap-3 cursor-pointer"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IoCloudUploadOutline className="h-10 w-10 text-blue-600" />
                      </motion.div>
                      <div className="text-sm text-gray-600">
                        <span className="text-blue-600 font-semibold">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                        <p className="text-xs text-gray-500">
                          PDF or Word documents (max 10MB)
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Uploaded Files List */}
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
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700"
                          >
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
