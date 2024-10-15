import axios from 'axios'
const fetchStaffDetailsbysid = async () => {

    let student  = localStorage.getItem("student_id")
    if(student){
    try {
        const response = await axios.post('http://localhost:5472/services/retrievestaffbystudid', {
            searchwith: student
        });
         return response.data
    } catch (err) {
        console.error('Error retrieving staff details:', err);
       // setError(err.response ? err.response.data.Message : 'Error fetching data');
    }
};

}

export default fetchStaffDetailsbysid;