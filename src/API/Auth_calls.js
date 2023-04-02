import axios from "axios";

const BASE_URL = "https://localhost:6000/auth";

export const sendLoginRequest = async (params) => {
  const result = await axios
    .post(`${BASE_URL}/login`, params)
    .catch((error) => {
      console.log(error);
    });
  if (result && result.status === 200) {
    alert(result.data.message);
  }
};

/**/
