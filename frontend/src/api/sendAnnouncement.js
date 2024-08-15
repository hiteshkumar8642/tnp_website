import apiClient from "../services/api";

export async function sendAnnouncements(formData) {
  try {
    //console.log(formData);
    const params = new URLSearchParams(formData);
    const response = await apiClient.post(
      "/api/addannouncement/",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Failed to send announcements", error);
    throw error;
  }
}
