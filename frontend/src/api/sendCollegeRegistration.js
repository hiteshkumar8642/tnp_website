import unprotectedApiClient from "../services/unprotectedApi";

export async function sendNewCollege(formData) {
  const response = await unprotectedApiClient.post(
    "api/college-register/",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
}
