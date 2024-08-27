import apiClient from "../services/api";

export async function modifyUserData(formData) {
  try {
    const params = new URLSearchParams(formData);
    const response = await apiClient.post(
      "/api/modifyuser/",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Failed to send Modified user data", error);
    throw error;
  }
}
