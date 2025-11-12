import BpmnModeler from "bpmn-js/lib/Modeler";
import { useEffect } from "react";
import { useSocket } from "../context/socket";

export function useBpmnModeler(id: string) {
  const socket = useSocket();

  useEffect(() => {
    const modelerCreated = new BpmnModeler({
      container: `#${id}`,
    });

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

    socket.on("diagram:init", handleDiagramInit);
    socket.on("diagram:update", handleDiagramUpdate);
    modelerCreated.on("commandStack.changed", handleCommandStackChanged);
  }, [id, socket]);
}
