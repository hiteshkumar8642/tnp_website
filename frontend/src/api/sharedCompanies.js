import apiClient from "../services/api";

export async function fetchSharedCompanies() {
  try {
    const response = await apiClient.get("/api/sharedcompanylist/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch company contacts", error);
    throw error;
  }
}
