import apiClient from "../services/api";

export async function fetchComingCompanyDetails() {
  try {
    const response = await apiClient.get("dashboard/api/application/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch company details", error);
    throw error;
  }
}
