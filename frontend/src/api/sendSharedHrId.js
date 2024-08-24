import apiClient from "../services/api";

export async function sendSharedHrId(formData) {
  try {
    const params = new URLSearchParams(formData);
    const response = await apiClient.post(
      "api/transfer-contact/",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Failed to send Hr_id", error);
    throw error;
  }
}
