import unprotectedApiClient from "../services/unprotectedApi";

export async function setNewPass(data) {
  await unprotectedApiClient.post(`api/passwordreset/confirm/`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
