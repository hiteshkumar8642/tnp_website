import axios from "axios";

const host = "http://127.0.0.1:8000";
export async function fetchBranches() {
  try {
    const response = await axios.get(`${host}/api/courselist/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
