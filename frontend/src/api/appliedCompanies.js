import apiClient from "../services/api";

export async function fetchAppliedCompanies() {
  try {
    const response = await apiClient.get("/api/appliedCompany/");
    
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Applied Companies", error);
    throw error;
  }
}
