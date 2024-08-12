import apiClient from "../services/api";

export async function fetchAllStudents() {
  try {
    const response = await apiClient.get("/apis/studentlist/");
    console.log("idugudbvf",response);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch All Students", error);
    throw error;
  }
}
