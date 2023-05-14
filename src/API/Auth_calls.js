import axios from "axios";

const BASE_URL = "http://localhost:4000";
// const BASE_URL = "https://sw-project-backend.onrender.com/Auth";

export const sendLoginRequest = async (data) => {
  try {
    const result = await axios.post(`${BASE_URL}/auth`, data);
    if (result.status === 200) {
      alert(result.data.message);
    }
  } catch (error) {
    console.error(error);
  }
};
