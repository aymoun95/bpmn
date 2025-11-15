// hooks/useUserPresence.ts
import { useEffect, useState } from "react";
import { useSocket } from "../context/socket";

export function useUserPresence() {
  const socket = useSocket();
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const handleCount = (count: number) => setUserCount(count);
    socket.on("user:count", handleCount);

    return () => {
      socket.off("user:count", handleCount);
    };
  }, [socket]);

  return userCount;
}
