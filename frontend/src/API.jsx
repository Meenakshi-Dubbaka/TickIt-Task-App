import axios from "axios";

const apiUrl = "https://tickit-task-app-2.onrender.com";
export const clientServer = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});
