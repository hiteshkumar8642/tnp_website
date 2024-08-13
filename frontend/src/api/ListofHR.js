import apiClient from "../services/api";

export async function fetchHRList() {
  try {
    const response = await apiClient.get("/apis/hr_list/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch HR contacts", error);
    throw error;
  }
}
