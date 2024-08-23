import unprotectedApiClient from "../services/unprotectedApi";

export async function fetchBranches() {
  try {
    console.log("kuch bhi");
    const response = await unprotectedApiClient.get(`api/courselist/`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
