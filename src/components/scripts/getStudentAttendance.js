const getStudentAttendance = async (studentId, selectedMonth) => {
    try {
      const response = await fetch("http://localhost:5000/services/getstuddashatt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sid: studentId,
          month: selectedMonth,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data; // Returns attendance data { Total, absent, present }
    } catch (error) {
      console.error("Error fetching student attendance:", error);
      return null;
    }
  };
  
  export default getStudentAttendance;
  