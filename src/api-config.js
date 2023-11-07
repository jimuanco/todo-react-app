let backendHost;

const hostname = window && window.location && window.location.hostname;

hostname === "localhost" && (backendHost = "http://localhost:8080");

export const API_BASE_URL = backendHost;