import apiClient from "../services/api";

export async function fetchmyHRList() {
  try {
    const response = await apiClient.get("dashboard/api/my_hr_list/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch My HR contacts", error);
    throw error;
  }
}
