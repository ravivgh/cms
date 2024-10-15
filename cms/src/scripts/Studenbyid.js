import axios from 'axios'
const studentInfo = async () => {

    var id = localStorage.getItem("student_id")
    if(id){
    try {

        const response = await axios.post('http://localhost:5472/services/retrievestudentsbyid', {
            searchwith : parseInt(id), 
        });
        
        
        return response.data
    } catch (error) {
        // Handle any errors
        console.error('Error retrieving student info:', error.response ? error.response.data : error.message);
    }
}
else{

    return false
}
};

export default studentInfo;

    