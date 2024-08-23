import unprotectedApiClient from "../services/unprotectedApi";

export async function fetchCompanyList() {
  try {
    const response = await unprotectedApiClient.get("/api/companylist/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch College List");
    throw error;
  }
}
