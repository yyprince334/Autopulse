export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function setAccessToken(token: string) {
  localStorage.setItem("accessToken", token);
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
}