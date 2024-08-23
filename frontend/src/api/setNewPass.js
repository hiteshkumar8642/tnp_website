import unprotectedApiClient from "../services/unprotectedApi";

export async function setNewPass(data) {
  await unprotectedApiClient.post(`api/password_reset/confirm/`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
