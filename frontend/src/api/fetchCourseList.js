import apiClient from "../services/api";

export async function fetchCourseList() {
  try {
    const response = await apiClient.get("/api/courselist/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Course List");
    throw error;
  }
}
