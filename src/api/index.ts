import axios from "axios";
const BASE_URL = "https://newsapi.org/v2/";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "X-Api-key": "d7547ae8d4e4434abc28a4e72a9754b2",
  },
});
