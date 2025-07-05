
export const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_SERVER_URL || "https://pmboard.app"
    : "http://localhost:8000";

export const DOMAIN = "PMBoard"; // Used for local storage key and other places where we need to identify the domain.
