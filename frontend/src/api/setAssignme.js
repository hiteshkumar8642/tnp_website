import apiClient from "../services/api";

export async function setAssignme(formData) {
  try {
    console.log(formData);
    const params = new URLSearchParams(formData);
    const response = await apiClient.post(
      "api/api/assignme/",
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
    console.error("Failed to Assign HR", error);
    throw error;
  }
}
