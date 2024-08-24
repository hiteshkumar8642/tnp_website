import unprotectedApiClient from "../services/unprotectedApi";

export async function fetchBranches() {
  try {
    const response = await unprotectedApiClient.get(`api/courselist/`);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
