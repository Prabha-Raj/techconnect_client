import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api",
});

export const createRoom = (roomId, createdBy) =>
  API.post("/rooms", { roomId, createdBy });

export const getRoom = (roomId) => API.get(`/rooms/${roomId}`);

export const getAllRooms = async () => {
  try {
    const res = await API.get("/rooms");
    return res.data;
  } catch {
    return [];
  }
};

export const joinRoom = (roomId, username, deviceInfo) =>
  API.post("/rooms/join", { roomId, username, deviceInfo });

export const leaveRoom = (roomId, username) =>
  API.post("/rooms/leave", { roomId, username });

export const getRoomAnalytics = (roomId) =>
  API.get(`/rooms/${roomId}/analytics`);
