// hooks/useBpmnModeler.ts
import { useSocket } from "../context/socket";
import { useBpmnModelerInstance } from "./useBpmnModelerInstance";
import { useDiagramSync } from "./useDiagramSync";
import { useEditorLock } from "./useEditorLock";
import { useUserPresence } from "./useUserPresence";

export function useBpmnModeler(id: string) {
  const modelerRef = useBpmnModelerInstance(id);

  useDiagramSync(modelerRef);
  const { isLocked, lockedBy } = useEditorLock(modelerRef);
  const userCount = useUserPresence();
  const socket = useSocket();

  return {
    userCount,
    lockedBy,
    isLocked,
    socketId: socket.id,
  };
}
