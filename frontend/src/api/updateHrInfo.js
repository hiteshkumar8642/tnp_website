import apiClient from "../services/api";

export async function sendHRinfo(id, status) {
  try {
    const params = new URLSearchParams({ id, status });
    const response = await apiClient.post(
      "api/hrdata-modified/",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Failed to send HR contact", error);
    throw error;
  }
}
