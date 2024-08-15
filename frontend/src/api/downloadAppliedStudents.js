import apiClient from "../services/api";

export async function fetchDownloadAppliedStudents(companyId) {
  try {
    //console.log("IN API",companyId);
    const response = await apiClient.get(`api/download-applied-students/${companyId}/`, {
      responseType: 'blob', // Ensure the response is treated as a file
    });
    return response;
  } catch (error) {
    console.error("Failed to fetch download", error);
    throw error;
  }
}