import apiClient from "../services/api";

export async function fetchSharedHRList() {
  try {
    const response = await apiClient.get("apis/sharedhrlist/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch HR contacts", error);
    throw error;
  }
}
