import axios from "axios";

const BASE_URL = "https://sw-project-backend.onrender.com/Auth";

export const sendLoginRequest = async (params) => {
  const result = await axios.get(BASE_URL, {
    params,
  });
  if (result.status === 200) {
    alert(result.data.message);
  }
};
