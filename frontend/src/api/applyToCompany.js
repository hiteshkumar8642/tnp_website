import apiClient from "../services/api";

// Function to handle applying to a company
export async function applyToCompany(formData) {
  try {
    const params = new URLSearchParams(formData);
    const response = await apiClient.post(
      "api/apply-to-company/",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Failed to apply to company", error);
    throw error;
  }
}
