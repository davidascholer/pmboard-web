import appgenConfig from "@/appgen.config"

export const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? appgenConfig.serverUrl
    : "http://localhost:8000";

export const DOMAIN = appgenConfig.title.toLowerCase(); // Used for local storage key and other places where we need to identify the domain.
