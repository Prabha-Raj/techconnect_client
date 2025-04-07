import { useParams, useSearchParams } from "react-router-dom";
import JitsiMeet from "../components/JitsiMeet";

const Room = () => {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "Student";

  return <JitsiMeet roomName={roomId} displayName={name} />;
};

export default Room;
