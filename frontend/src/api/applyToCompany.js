import apiClient from "../services/api";

// Function to handle applying to a company
export async function applyToCompany(companyId, userId) {
  try {
    const response = await apiClient.post(`api/apply-to-company/${companyId}/`, {
      user: userId,
    });
    return response;
  } catch (error) {
    console.error("Failed to apply to company", error);
    throw error;
  }
}