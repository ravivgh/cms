import axios from "axios";

const deleteStaff = async (staffId) => {
  try {
    const response = await axios.post(
      "http://localhost:5472/services/deletestaff",
      {
        id: staffId,
      }
    );

    console.log("Response:", response.data);

    if (response.status === 200) {
      console.log("Student deleted successfully.");
    }

    return response;
  } catch (error) {
    if (error.response) {
      console.error("Error:", error.response.data.message);
    } else {
      console.error("Error:", error.message);
    }
    throw new Error(error);
  }
};

export default deleteStaff;
