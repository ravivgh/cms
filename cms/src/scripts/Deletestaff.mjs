import axios from "axios";

const  deleteStaff = async (studentId) => {
  try {
    const response = await axios.post('http://localhost:5472/services/deletestaff', {
            id: studentId
        });
    
    console.log('Response:', response.data); 

    if (response.status === 200) {
      console.log('Student deleted successfully.');
    }
  } catch (error) {
    if (error.response) {
      console.error('Error:', error.response.data.message); 
    } else {
      console.error('Error:', error.message); 
    }
  }
}

export default deleteStaff;
