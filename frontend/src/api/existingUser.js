import unprotectedApiClient from "../services/unprotectedApi";

export async function fetchExistingUsers() {
  try {
    const response = await unprotectedApiClient.get("/api/existinguserlist/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch College List");
    throw error;
  }
}
