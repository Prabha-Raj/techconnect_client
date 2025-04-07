import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { createRoom, getRoom, getAllRooms } from "../api/roomApi";

const Home = () => {
  const [joinName, setJoinName] = useState("");
  const [createName, setCreateName] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const navigate = useNavigate();

  // Fetch available rooms on mount
  useEffect(() => {
    const fetchRooms = async () => {
      const data = await getAllRooms();
      const roomsArray = Object.entries(data || {}).map(([id, room]) => ({
        roomId: id,
        ...room,
      }));
      setAvailableRooms(roomsArray);
    };
    fetchRooms();
  }, []);

  // Create Room
  const handleCreate = async () => {
    if (!createName) {
      alert("Please enter your name to create a room.");
      return;
    }

    const newRoomId = uuidv4().split("-")[0];

    try {
      await createRoom(newRoomId, createName);
      navigate(`/room/${newRoomId}?name=${encodeURIComponent(createName)}`);
    } catch (err) {
      alert("Error creating room: " + err.message);
    }
  };

  // Join selected room
  const handleConnect = (roomId) => {
    if (!joinName) {
      alert("Please enter your name before joining a room.");
      return;
    }

    navigate(`/room/${roomId}?name=${encodeURIComponent(joinName)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex flex-col items-center justify-center px-4 py-8">
      <div className="text-white mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">TechConnect 🔗</h1>
        <p className="text-lg text-gray-300">Create or join a real-time video room</p>
      </div>

      {/* Create Room */}
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-xl mb-10">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">🎦 Create a Room</h2>
        <input
          type="text"
          placeholder="Your Name (Teacher)"
          value={createName}
          onChange={(e) => setCreateName(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleCreate}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
        >
          ➕ Create Room
        </button>
      </div>

      {/* Join Room */}
      <div className="w-full max-w-5xl">
        <div className="mb-4 text-white text-xl font-medium">🙋‍♂️ Join an Existing Room</div>
        <input
          type="text"
          placeholder="Your Name (Student)"
          value={joinName}
          onChange={(e) => setJoinName(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableRooms.length === 0 ? (
            <p className="text-white">No rooms available currently.</p>
          ) : (
            availableRooms.map((room) => (
              <div
                key={room.roomId}
                className="bg-white p-5 rounded-xl shadow-md flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-indigo-700 mb-2">
                    Room ID: {room.roomId}
                  </h3>
                  <p className="text-gray-600">Created By: {room.createdBy}</p>
                  <p className="text-sm text-gray-400">
                    Created At:{" "}
                    {new Date(room.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleConnect(room.roomId)}
                  className="mt-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
                >
                  🚪 Connect
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
