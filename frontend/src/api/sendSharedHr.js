import apiClient from "../services/api";

export async function sendSharedHr(formData) {
  try {
    const params = new URLSearchParams(formData);
    const response = await apiClient.post(
      "/api/hrcontactmodify/",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Failed to send Shared HR Details", error);
    throw error;
  }
}
