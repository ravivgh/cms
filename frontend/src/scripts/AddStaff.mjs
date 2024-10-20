import axios from 'axios';

const insertStaff = async (staff,Class,section,subject,email,phone) => {
  try {
    const staffData = {
      staffname: staff,  
      Class: Class ,          
      section: section,           
      subject: subject, 
      email: email, 
      phone: phone,    
      college: parseInt(localStorage.getItem("college_id"))   
    };

    const response = await axios.post('http://localhost:5472/services/insertstaff', staffData);

    
    if (response.status === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    
    console.error('Error:', error);
  }
};


export default insertStaff;
