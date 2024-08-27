import apiClient from "../services/api";

export async function sendHRCallResponse(formData) {
  try {
    const params = new URLSearchParams(formData);
    const response = await apiClient.post(
      "/api/hrcallresponse/",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Failed to send announcements", error);
    throw error;
  }
}
