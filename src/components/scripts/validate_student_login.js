import axios from 'axios'

const validatestudlogin = async (username)=>{
  try {
    const response = await axios.post('http://localhost:5472/services/validatestudlogin', { 
        email: username
    });

    
    if(response && response.data.Message == "OTP Sent Successfully" && response.data.OTP) {
        
        localStorage.setItem('otp', response.data.OTP);
        localStorage.setItem('student_id', response.data._id);
        localStorage.setItem('profile_pic',response.data.profile_pic)
        localStorage.setItem('Student_Name',response.data.name)
        localStorage.setItem('cid',response.data.cid)
        localStorage.setItem('sid',response.data.sid)
        localStorage.setItem('college_id',response.data.collegeid)

        return true

        
         
    } else {
      
        console.log('Student Not Found')
        return false
    }

} catch (error) {
    // Log and handle the error
    console.error('Error during login:', error);
}

    




}


export default validatestudlogin;