import axios from "axios";

export async function fetchForgetPassword(email) {
  try {
    console.log("email");
    const response = await axios.post(
      "http://127.0.0.1:8000/user/api/password_reset/",
      { email : email }
    );
    console.log("in fetching password donne");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch forget Password", error);
    throw error;
  }
}
