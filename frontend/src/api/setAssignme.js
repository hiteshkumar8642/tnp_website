import apiClient from "../services/api";

export async function setAssignme(formData) {
  try {
    const params = new URLSearchParams(formData);
    const response = await apiClient.post("/api/assignme/", params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response;
  } catch (error) {
    console.error("Failed to Assign HR", error);
    throw error;
  }
}
