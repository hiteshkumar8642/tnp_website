import apiClient from "../services/api";

export async function addNewCompany(formData) {
  try {
    const response = await apiClient.post("/api/addcompany/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    console.error("Failed to send New Company Data", error);
    throw error;
  }
}
