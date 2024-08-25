import unprotectedApiClient from "../services/unprotectedApi";

export async function sendContactDetail(formData) {
  try {
    const params = new URLSearchParams(formData);
    const response = await unprotectedApiClient.post(
      "/api/contactus/",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Failed to send announcements", error);
    throw error;
  }
}
