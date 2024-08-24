import apiClient from "../services/api";

export async function fetchAnnouncements() {
  try {
    const response = await apiClient.get("/api/sharedcompanylist/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Shared Company Contacts", error);
    throw error;
  }
}
