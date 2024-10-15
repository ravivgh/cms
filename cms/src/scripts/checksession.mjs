import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SessionRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stud = localStorage.getItem("student_id");
    const admin = localStorage.getItem("admin_id");
    const staff = localStorage.getItem("staff_id");

    if (!stud && !admin && !staff) {
      if (location.pathname !== "/login") {
        navigate("/login");
      }
    } else {
      if (location.pathname === "/login/faculty" && staff) {
        navigate("/facultydashboard");
      } else if (location.pathname === "/login/admin" && admin) {
        navigate("/dashboard");
      } else if (location.pathname === "/login/student" && stud) {
        navigate("/studentdashboard");
      } else if (location.pathname === "/login") {
        if (staff) {
          navigate("/facultydashboard");
        } else if (admin) {
          navigate("/dashboard");
        } else if (stud) {
          navigate("/studentdashboard");
        }
      }
    }
  }, [navigate, location.pathname]);

  return null;
};

export default SessionRedirect;
