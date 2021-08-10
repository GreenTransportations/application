const API_PORT = 8000;
const API_BASE_PATH = "/v0";
const API_BASE_URL = "http://localhost";

export const API_CONFIG = {
    PORT: API_PORT,
    BASE_PATH: API_BASE_PATH,
    BASE_URL: API_BASE_URL,
    BASE_PORT_URL: `${API_BASE_URL}:${API_PORT}`,
    URL: `${API_BASE_URL}:${API_PORT}${API_BASE_PATH}`
};