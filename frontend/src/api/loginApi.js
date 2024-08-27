import unprotectedApiClient from "../services/unprotectedApi";

export async function login(user) {
  const response = await unprotectedApiClient.post("/api/login/", user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
