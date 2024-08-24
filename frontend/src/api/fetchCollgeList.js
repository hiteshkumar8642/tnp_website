//import apiClient from "../services/api";
import unprotectedApiClient from "../services/unprotectedApi";

export async function fetchCollegeList() {
  try {
    const response = await unprotectedApiClient.get("/api/collegelist/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch College List");
    throw error;
  }
}
