import axios from 'axios';

const insertStudent = async (sname,Class,section,dob,email,phone) => {
  try {
    const staffData = {
      name: sname,  
      Class: Class ,          
      section: section,           
      d_o_b: dob, 
      Email: email, 
      phone: phone,    
      college: parseInt(localStorage.getItem("college_id"))
    };

    const response = await axios.post('http://localhost:5472/services/insertstudent', staffData);

    
    if (response.status === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    
    console.error('Error:', error);
  }
};


export default insertStudent;
