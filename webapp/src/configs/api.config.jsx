const API_PORT = 3000;
const API_BASE_PATH = "/test";
const API_BASE_URL = "http://localhost";

export const API_CONFIG = {
    PORT: API_PORT,
    BASE_PATH: API_BASE_PATH,
    BASE_URL: API_BASE_URL,
    BASE_PORT_URL: `${API_BASE_URL}:${API_PORT}`,
    URL: `${API_BASE_URL}:${API_PORT}${API_BASE_PATH}`
};