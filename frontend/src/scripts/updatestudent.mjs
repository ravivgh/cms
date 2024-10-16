import axios from 'axios'
const updateStudentDetails = async (email,mobile,Student_Name) => {
    let sid = localStorage.getItem("student_id")
    try {
      const response = await axios.post('http://localhost:5472/services/updatestudentdetails', {
        studentId :sid,   
        Email: email,  
        Mobile: mobile,  
        Student_Name: Student_Name,  
      });

      if (response.data){

        return true
      }
      else{
        return false
      }
    } catch (error) {
      console.error('Error updating student details:', error);
      setResponseMessage('Error updating student details');
    }
  };
export default updateStudentDetails;