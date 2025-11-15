import type { EventBus } from "bpmn-js/lib/BaseViewer";
import BpmnModeler from "bpmn-js/lib/Modeler";
import { useEffect, useState, type RefObject } from "react";
import { useSocket } from "../context/socket";

type Canvas = { _container: { style: { pointerEvents: string } } };

const LOCK_EVENTS = ["element.click", "element.mousedown", "create.start"];

const UNLOCK_EVENTS = ["element.mouseup", "create.end", "create.canceled"];

export function useEditorLock(modelerRef: RefObject<BpmnModeler | null>) {
  const socket = useSocket();
  const [isLocked, setIsLocked] = useState(false);
  const [lockedBy, setLockedBy] = useState<string | null>(null);

  useEffect(() => {
    const modeler = modelerRef.current;
    if (!modeler) return;

    const eventBus: EventBus<typeof BpmnModeler> = modeler.get("eventBus");

    /** LOCAL EVENTS → LOCK/UNLOCK */
    const tryLock = () => socket.emit("editor:lock");
    const releaseLock = () => socket.emit("editor:unlock");

    LOCK_EVENTS.forEach((event) => eventBus.on(event, tryLock));
    UNLOCK_EVENTS.forEach((event) => eventBus.on(event, releaseLock));

    const handleLocked = ({ userId }: { userId: string }) => {
      setIsLocked(true);
      setLockedBy(userId);

      if (userId !== socket.id) {
        const canvas = modeler.get("canvas") as Canvas;
        canvas._container.style.pointerEvents = "none";
      }
    };

    const handleUnlocked = () => {
      setIsLocked(false);
      setLockedBy(null);

      const canvas = modeler.get("canvas") as Canvas;
      canvas._container.style.pointerEvents = "auto";
    };

    socket.on("editor:locked", handleLocked);
    socket.on("editor:unlocked", handleUnlocked);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelerRef]);

  return { isLocked, lockedBy };
}
