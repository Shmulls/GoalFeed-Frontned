import axios from "axios";

// const BASE_URL = "http://localhost:4000";
const BASE_URL = "https://sw-project-backend.onrender.com";

export const sendRegistrationRequest = async (data) => {
  try {
    const result = await axios.post(`${BASE_URL}/auth`, data).then(res =>{
      console.log(res.data.status)
      if (res.data.status === 200) {
        console.log("ttggg")
        alert(res.data.message);
      }
    });
    console.log(res.data.status);
   
    

    
  } catch (error) {
    console.error(error);
  }
};

export const sendLoginRequest = async (data) => {
  try {
    const result = await axios.get(`${BASE_URL}/auth`, data);
    // console.log(result);
    if (result.status === 200) {
      alert(result.data.message);
    }
  } catch (error) {
    console.error(error);
  }
};
