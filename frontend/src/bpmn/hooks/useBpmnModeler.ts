import BpmnModeler from "bpmn-js/lib/Modeler";
import { useEffect, useState } from "react";
import { useSocket } from "../context/socket";

export function useBpmnModeler(id: string) {
  const socket = useSocket();
  const [userCount, setUserCount] = useState(0);

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

    const handleUserCount = (count: number) => {
      setUserCount(count);
    };

    socket.on("user:count", handleUserCount);
    socket.on("diagram:init", handleDiagramInit);
    socket.on("diagram:update", handleDiagramUpdate);
    modelerCreated.on("commandStack.changed", handleCommandStackChanged);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { userCount };
}
