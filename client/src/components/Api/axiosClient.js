import axios from "axios";

const server = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

export default server;
