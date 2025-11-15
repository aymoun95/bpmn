import React, { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { BACKEND_URL } from "../config";

export const socket: Socket = io(BACKEND_URL, {
  transports: ["websocket", "polling"],
});

export const SocketContext = createContext<Socket>(socket);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = React.useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
