import React, { useEffect } from "react";
import { joinRoom, leaveRoom } from "../api/roomApi";
import { v4 as uuidv4 } from "uuid";

const JitsiMeet = ({ roomName, displayName }) => {
  useEffect(() => {
    const username = displayName || "Guest";
    const deviceInfo = navigator.userAgent;

    joinRoom(roomName, username, deviceInfo);

    const domain = "8x8.vc";
    const options = {
      roomName: `vpaas-magic-cookie-30a65e771f894191bfb18b824b42e495/${roomName}`,
      parentNode: document.getElementById("jitsi-container"),
      userInfo: {
        displayName: username,
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => {
      leaveRoom(roomName, username);
      api?.dispose();
    };
  }, [roomName, displayName]);

  return (
    <div className="w-full h-screen">
      <div id="jitsi-container" className="w-full h-full" />
    </div>
  );
};

export default JitsiMeet;
