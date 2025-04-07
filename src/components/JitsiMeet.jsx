import React, { useEffect } from "react";

const JitsiMeet = ({ roomName, displayName }) => {
  useEffect(() => {
    const domain = "8x8.vc";
    const options = {
      roomName: `vpaas-magic-cookie-30a65e771f894191bfb18b824b42e495/${roomName}`,
      parentNode: document.getElementById("jitsi-container"),
      userInfo: {
        displayName: displayName || "Guest",
      },
      // Optional: Add JWT token if needed
      // jwt: "YOUR_JWT_TOKEN",
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => api?.dispose(); // clean up on component unmount
  }, [roomName, displayName]);

  return (
    <div className="w-full h-screen">
      <div id="jitsi-container" className="w-full h-full" />
    </div>
  );
};

export default JitsiMeet;
