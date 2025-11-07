import axios from "axios";

const apiUrl = "http://localhost:8000/";
export const clientServer = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});
