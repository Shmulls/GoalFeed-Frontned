import axios from "axios";

const BASE_URL = "https://sw-project-backend.onrender.com";

export const sendLoginRequest = async (params) => {
  const result = await axios
    .get(BASE_URL, {
      params,
    })
    .catch((error) => {
      console.log(error);
    });
  if (result && result.status === 200) {
    alert(result.data.message);
  }
};

/**/
