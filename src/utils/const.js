// export const BASE_URL = "http://localhost:5678";
export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:5678" : "api";
