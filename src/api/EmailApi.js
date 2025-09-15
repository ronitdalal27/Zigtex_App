import axios from "axios";

axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

const API = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// Attach token dynamically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("gmailToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchInbox = () => API.get("/gmail/User/ListEmails");
export const fetchSent = () => API.get("/gmail/User/ListSentEmails");
export const fetchTrash = () => API.get("/gmail/User/GetTrashEmails");
export const sendEmail = (data) => API.post("/gmail/User/SendMail", data);
export const replyEmail = (data) => API.post("/gmail/User/ReplyMail", data);
