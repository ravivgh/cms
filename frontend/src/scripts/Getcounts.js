import axios from 'axios';


  
  const fetchCounts = async (month) => {
    try {
      
      const response = await axios.post('http://localhost:5472/services/getcount',{

        Month : month
      });
      
      if (response.status === 200) {
        return response.data
       

    
      } else {
        return false
      }
    } catch (err) {
      
    } finally {
      
    }
  };

  fetchCounts()



export default fetchCounts;
