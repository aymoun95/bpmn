import type { EventBus } from "bpmn-js/lib/BaseViewer";
import BpmnModeler from "bpmn-js/lib/Modeler";
import { useEffect, useState } from "react";
import { useSocket } from "../context/socket";

export function useBpmnModeler(id: string) {
  const socket = useSocket();
  const [userCount, setUserCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockedBy, setLockedBy] = useState<string | null>(null);

  useEffect(() => {
    const modelerCreated = new BpmnModeler({
      container: `#${id}`,
    });
    const eventBus: EventBus<typeof modelerCreated> =
      modelerCreated.get("eventBus");

    const handleDiagramInit = async (xml: string | null) => {
      if (xml) {
        await modelerCreated.importXML(xml);
      }
    };
    const handleDiagramUpdate = async (xml: string) => {
      await modelerCreated.importXML(xml);
    };
    const handleCommandStackChanged = async () => {
      const { xml } = await modelerCreated.saveXML({ format: true });
      socket.emit("diagram:update", xml);
    };
    const handleUserCount = (count: number) => {
      setUserCount(count);
    };

    // 🖱 when user starts interacting

    // Lock on element interaction
    eventBus.on("element.mousedown", () => {
      if (!isLocked) {
        socket.emit("editor:lock");
      }
    });
    eventBus.on("element.mouseup", () => {
      socket.emit("editor:unlock");
    });

    // Lock on palette drag
    eventBus.on("create.start", () => {
      if (!isLocked) {
        socket.emit("editor:lock");
      }
    });
    eventBus.on("create.end", () => {
      socket.emit("editor:unlock");
    });
    eventBus.on("create.canceled", () => {
      socket.emit("editor:unlock");
    });

    // 🔒 when the editor is locked
    socket.on("editor:locked", ({ userId }) => {
      console.log("[BPMN] Received editor:locked", userId);
      setIsLocked(true);
      setLockedBy(userId);
      // Disable modeling if locked by another user
      if (userId !== socket.id) {
        const canvas = modelerCreated.get("canvas");
        if (canvas && (canvas as any)._container) {
          (canvas as any)._container.style.pointerEvents = "none";
        }
      }
    });

    // 🔓 when the editor becomes free
    socket.on("editor:unlocked", () => {
      setIsLocked(false);
      setLockedBy(null);
      // Enable modeling
      const canvas = modelerCreated.get("canvas");
      if (canvas && (canvas as any)._container) {
        (canvas as any)._container.style.pointerEvents = "auto";
      }
    });

    socket.on("user:count", handleUserCount);
    socket.on("diagram:init", handleDiagramInit);
    socket.on("diagram:update", handleDiagramUpdate);
    modelerCreated.on("commandStack.changed", handleCommandStackChanged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isLocked]);

  return { userCount, lockedBy, isLocked, socketId: socket.id };
}
