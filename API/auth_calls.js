import axios from "axios";

const BASE_URL = "http://localhost:4000/Auth";

export const sendLoginRequest = async (params) => {
  const result = await axios.get(BASE_URL, {
    params,
  });
  if (result.status === 200) {
    alert(result.data.message);
  }
};
