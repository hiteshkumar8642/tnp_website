import unprotectedApiClient from "../services/unprotectedApi";

export async function fetchForgetPassword(email) {
  try {
    console.log("email");
    const params = new URLSearchParams({ email: email });
    const response = await unprotectedApiClient.post(
      "api/password_reset/",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("in fetching password donne");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch forget Password", error);
    throw error;
  }
}
