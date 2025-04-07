import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api",
});

// ✅ Create a room
export const createRoom = (roomId, createdBy) =>
  API.post("/rooms", { roomId, createdBy });

// ✅ Check if a room exists
export const getRoom = (roomId) => API.get(`/rooms/${roomId}`);

// ✅ Get all available rooms
export const getAllRooms = async () => {
  try {
    const res = await API.get("/rooms");
    return res.data;
  } catch (err) {
    console.error("Error fetching rooms", err);
    return [];
  }
};
