import apiClient from "../services/api";

export async function sendSharedCompany(formData) {
  try {
    console.log(formData);
    const params = new URLSearchParams(formData);
    const response = await apiClient.post(
      "api/shared-companymodify/",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Failed to send Shared Company Details", error);
    throw error;
  }
}
