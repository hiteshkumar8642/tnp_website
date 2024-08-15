import apiClient from "../services/api";

export async function fetchmyHRList() {
  try {
    const response = await apiClient.get("/api/myhrlist/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch My HR contacts", error);
    throw error;
  }
}
