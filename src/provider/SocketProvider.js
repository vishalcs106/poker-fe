import React from "react";
import SocketContext from "../context/SocketContext";

const SocketProvider = ({ children, socket }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
