import unprotectedApiClient from "../services/unprotectedApi";

export async function Signup(formData) {
  const response = await unprotectedApiClient.post("/api/register/", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
