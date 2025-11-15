// hooks/useDiagramSync.ts
import BpmnModeler from "bpmn-js/lib/Modeler";
import { useEffect, type RefObject } from "react";
import { useSocket } from "../context/socket";

export function useDiagramSync(modelerRef: RefObject<BpmnModeler | null>) {
  const socket = useSocket();

  useEffect(() => {
    const modeler = modelerRef.current;
    if (!modeler) return;

    const handleInit = async (xml: string | null) => {
      if (xml) await modeler.importXML(xml);
    };

    const handleUpdate = async (xml: string) => {
      await modeler.importXML(xml);
    };

    const handleCommandStackChanged = async () => {
      const { xml } = await modeler.saveXML({ format: true });
      socket.emit("diagram:update", xml);
    };

    socket.on("diagram:init", handleInit);
    socket.on("diagram:update", handleUpdate);
    modeler.on("commandStack.changed", handleCommandStackChanged);
  }, [modelerRef, socket]);
}
