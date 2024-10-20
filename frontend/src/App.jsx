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
import TimeTable from "./pages/MainTimeTable";
import CalendarMaster from "./pages/MainCalendarMaster";
import MainStudents from "./pages/MainStudents";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<MainHomePage />} />
        
        <Route path="/login" element={<MainLoginPage />} />
        <Route path="/register" element={<MainRegisterPage />} />
        <Route path="/login/faculty" element={<MainFacultyLogin />} />
        <Route path="/login/admin" element={<MainAdminLogin />} />
        <Route path="/login/student" element={<MainStudentLogin />} />
        {/* admin */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<MainDashboard />} />
          <Route path="/student" element={<MainStudents />} />
          <Route path="/attendance" element={<MainAttendance />} />
          <Route path="/faculty" element={<MainFaculty />} />
          <Route path = "/Master" element = {<CalendarMaster/>}/>
        </Route>

        {/* student */}
        <Route element={<MainStudentLayout />}>
          <Route path="/studentdashboard" element={<MainStudentDashboard />} />
          <Route path="/facultydetails" element={<MainFacultyDetails />} />
          <Route path="/timetable" element={<TimeTable />} />
        </Route>

        <Route element={<MainFacultyLayout />}>
          <Route path="/facultydashboard" element={<MainFacultyDashboard />} />
          <Route path="/students" element={<MainStudentDetails />} />
          <Route path="/attendancesheet" element={<MainAttendanceSheet />} />
          <Route path="/facultydata" element={<MainFacultys />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
