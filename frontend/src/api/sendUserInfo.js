import apiClient from "../services/api";
//import unprotectedApiClient from "../services/unprotectedApi";

export async function sendNewUserData(formData) {
  console.log(formData);
  try {
    const response = await apiClient.post("/api/savedetails/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Failed to send New Company Data", error);
    throw error;
  }
}
