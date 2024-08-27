import unprotectedApiClient from "../services/unprotectedApi";

export async function fetchForgetPassword(email) {
  try {
    const params = new URLSearchParams({ email: email });
    const response = await unprotectedApiClient.post(
      "/api/passwordreset/",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch forget Password", error);
    throw error;
  }
}
