import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainHomePage from "./pages/MainHomePage";
import MainLoginPage from "./pages/MainLoginPage";
import MainRegisterPage from "./pages/MainRegisterPage";
import MainFacultyLogin from "./pages/MainFacultyLogin";
import MainAdminLogin from "./pages/MainAdminLogin";
import MainStudentLogin from "./pages/MainStudentLogin";
import MainDashboard from "./pages/MainDashboard";
import MainLayout from "./layouts/MainLayout";
import MainStudentLayout from "./layouts/MainStudentLayout";
import MainStudent from "./pages/MainStudent";
import MainAttendance from "./pages/MainAttendance";
import MainFaculty from "./pages/MainFaculty";
import MainStudentDashboard from "./pages/MainStudentDashboard";
import MainFacultyDetails from "./pages/MainFacultyDetails";
import MainFacultyLayout from "./layouts/MainFacultyLayout";
import MainFacultyDashboard from "./pages/MainFacultyDashboard";
import MainFacultys from "./pages/MainFacultys";
import MainStudentDetails from "./pages/MainStudentDetails";
import MainAttendanceSheet from "./pages/MainAttendanceSheet";
import MainMaster from "./pages/MainMaster";
import MainAssistant from "./pages/MainAssistant";
import MainChatMessage from "./pages/MainChatMessage";
import MainAboutPage from "./pages/MainAboutPage";
import MainContactUsPage from "./pages/MainContactUsPage";
import MainProductPage from "./pages/MainProductPage";
import MainSolution from "./pages/MainSolution";
import MainAllViewStudent from "./pages/MainAllViewStudent";
import MainStudentList from "./pages/MainStudentList";
import MainReminder from "./pages/MainReminder";
import MainAppointment from "./pages/MainAppointment";
import MainCoursePage from "./pages/MainCoursePage";
import MainCourseAdd from "./pages/MainCourseAdd";
import MainCourseDetalis from "./pages/MainCourseDetalis";
import VideoCall from "./components/VideoCall";
import InitiateMeet from "./components/InitiateMeet";
import MainCourseFaculty from "./pages/MainCourseFaculty";
import MainFacultyAddCourse from "./pages/MainFacultyAddCourse";
import MainFacultyCourseDetails from "./pages/MainFacultyCourseDetails";
import MainFacultyChat from "./pages/MainFacultyChat";
import MainFacultyMaster from "./pages/MainFacultyMaster";
import MainFacultyAppointment from "./pages/MainFacultyAppointment";
import MainFacultyReminder from "./pages/MainFacultyReminder";
import MainAllStd from "./pages/MainAllStd";
import MainStdList from "./pages/MainStdList";
import MainCodeEditor from "./pages/MainCodeEditor";
import MainQuestionSheet from "./pages/MainQuestionSheet";
import MainStudentCourse from "./pages/MainStudentCourse";
import MainStudentCourseDetails from "./pages/MainStudentCourseDetails";
import MainStudentChat from "./pages/MainStudentChat";
import MainFacultyProfile from "./pages/MainFacultyProfile";
import MainFacultyLeave from "./pages/MainFacultyLeave";
import MainAdminProfile from "./pages/MainAdminProfile";
import MainAllLeaveList from "./pages/MainAllLeaveList";
import MainStudentLeave from "./pages/MainStudentLeave";
import MainStudentMaster from "./pages/MainStudentMaster";
import MainStudentAppointment from "./pages/MainStudentAppointment";
import MainStudentProfile from "./pages/MainStudentProfile";
import FaceScan from "./components/FaceScan";
import QnsView from "./components/QnsView";
// import Register from "./components/Register";
// import HomePage from "./components/HomePage";
// import LoginPage from "./components/LoginPage";

// import Navbar from "./components/Navbar";
// import StudentLogin from "./components/StudentLogin";
// import FaultyLogin from "./components/FaultyLogin";
// import AdminLogin from "./components/AdminLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<MainHomePage />} />
        <Route path="/solutions" element={<MainSolution />} />
        <Route path="/products" element={<MainProductPage />} />
        <Route path="/about" element={<MainAboutPage />} />
        <Route path="/contact" element={<MainContactUsPage />} />
        <Route path="/login" element={<MainLoginPage />} />
        <Route path="/register" element={<MainRegisterPage />} />
        <Route path="/login/faculty" element={<MainFacultyLogin />} />
        <Route path="/login/admin" element={<MainAdminLogin />} />
        <Route path="/login/student" element={<MainStudentLogin />} />
        {/* admin */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<MainDashboard />} />
          <Route path="/admin/profile" element={<MainAdminProfile />} />
          <Route path="/student" element={<MainStudent />} />
          <Route path="/leave-list" element={<MainAllLeaveList />} />
          <Route path="/attendance" element={<MainAttendance />} />
          {/* <Route path="/attendance/viewall" element={<MainAllViewStudent />} /> */}
          <Route path="/attendance/viewall/all" element={<MainStudentList />} />
          <Route path="/faculty" element={<MainFaculty />} />
          <Route path="/course" element={<MainCoursePage />} />
          <Route path="/course/addcourse" element={<MainCourseAdd />} />
          <Route path="/course/:courseId" element={<MainCourseDetalis />} />
          <Route path="/chat" element={<QnsView />} />
          <Route path="/collegemaster" element={<MainMaster />} />
          <Route
            path="/collegemaster/settings/appointment"
            element={<MainAppointment />}
          />
          <Route
            path="/collegemaster/settings/academic"
            element={<MainReminder />}
          />
          <Route path="/video-call" element={<VideoCall />} />
          <Route path="/initiate-meet" element={<InitiateMeet />} />
        </Route>

        {/* student */}
        <Route element={<MainStudentLayout />}>
          <Route path="/studentdashboard" element={<MainStudentDashboard />} />
          <Route path="/attendancemark" element={<FaceScan />} />
          <Route path="/student/profile" element={<MainStudentProfile />} />
          <Route path="/facultydetails" element={<MainFacultyDetails />} />
          <Route path="/code-editor" element={<MainCodeEditor />} />
          <Route path="/question-sheet" element={<MainQuestionSheet />} />
          <Route path="/leave-student" element={<MainStudentLeave />} />
          <Route path="/course-student" element={<MainStudentCourse />} />
          <Route
            path="/course-student/:coursesId"
            element={<MainStudentCourseDetails />}
          />
          <Route path="/chat-student" element={<MainStudentChat />} />
          <Route path="/video-call" element={<VideoCall />} />
          <Route path="/initiate-meet-student" element={<InitiateMeet />} />
          <Route
            path="/collegemaster-student"
            element={<MainStudentMaster />}
          />
          <Route
            path="/collegemaster-student/settings/appointment"
            element={<MainStudentAppointment />}
          />
        </Route>

        <Route element={<MainFacultyLayout />}>
          <Route path="/facultydashboard" element={<MainFacultyDashboard />} />
          <Route path="/faculty/profile" element={<MainFacultyProfile />} />
          <Route path="/students" element={<MainStudentDetails />} />
          <Route path="/attendancesheet" element={<MainAttendanceSheet />} />
          <Route path="/attendances/viewall" element={<MainAllStd />} />
          <Route path="/attendances/viewall/all" element={<MainStdList />} />
          <Route path="/facultydata" element={<MainFacultys />} />
          <Route path="/leave-faculty" element={<MainFacultyLeave />} />
          <Route path="/courses" element={<MainCourseFaculty />} />
          <Route path="/courses/addcourse" element={<MainFacultyAddCourse />} />
          <Route
            path="/courses/:coursesId"
            element={<MainFacultyCourseDetails />}
          />
          <Route path="/chats" element={<MainFacultyChat />} />
          <Route path="/video-call" element={<VideoCall />} />
          <Route path="/initiate-meet-faculty" element={<InitiateMeet />} />

          <Route
            path="/collegemaster-faculty"
            element={<MainFacultyMaster />}
          />
          <Route
            path="/collegemaster-faculty/settings/appointment"
            element={<MainFacultyAppointment />}
          />
          <Route
            path="/collegemaster-faculty/settings/academic"
            element={<MainFacultyReminder />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
