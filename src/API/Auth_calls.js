import axios from "axios";

// const BASE_URL = "http://localhost:4000";
const BASE_URL = "https://sw-project-backend.onrender.com";

export const sendRegistrationRequest = async (data) => {
  try {
    const result = await axios.post(`${BASE_URL}/auth`, data);
    if (result.status === 200) {
      alert(result.data.message);
    }
  } catch (error) {
    console.error(error);
  }
};

export const SendPostRequest = async (data) => {
  console.log("data:", data);
  try {
    const result = await axios.post(`${BASE_URL}/home`, data);
    if (result.status === 200) {
      alert(result.data.message);
      console.log(result.data.message);
    }
  } catch (error) {
    console.error(error);
  }
};

export const sendLoginRequest = async (data) => {
  try {
    const result = await axios.post(`${BASE_URL}/login`, data);
    console.log(result.data.message);
    if (result.status === 200) {
      alert(result.data.message);
    }
  } catch (error) {
    console.error(error);
  }
};
