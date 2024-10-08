import apiClient from "../services/api";

export async function fetchCallHistoryList() {
  try {
    const response = await apiClient.get("/api/hrcalllogs/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Call History");
    throw error;
  }
}
