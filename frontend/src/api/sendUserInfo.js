import apiClient from "../services/api";
//import unprotectedApiClient from "../services/unprotectedApi";

export async function sendNewUserData(formData) {
  try {
    const response = await apiClient.post("/api/savedetails/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    console.error("Failed to send user details", error);
    throw error;
  }
}
