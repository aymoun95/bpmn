import BpmnModeler from "bpmn-js/lib/Modeler";
import React, { useEffect } from "react";

interface BpmnCanvasProps {
  id?: string;
  className?: string;
}

const BpmnCanvas: React.FC<BpmnCanvasProps> = ({
  id = "bpmnview",
  className = "",
}) => {
  const openBpmnDiagram = (modeler: BpmnModeler) => {
    fetch("/initial.bpmn")
      .then((response) => response.text())
      .then((xml) => {
        modeler.importXML(xml);
      });
  };

  useEffect(() => {
    const modelerCreated = new BpmnModeler({
      container: `#${id}`,
    });

    modelerCreated.on("commandStack.changed", async () => {
      const { xml } = await modelerCreated.saveXML({ format: true });

      console.log({ xml });
    });

    openBpmnDiagram(modelerCreated);
  }, [id]);

  return (
    <>
      <div
        id={id}
        className={`bg-gray-50 border-r border-gray-200 ${className}`}
      ></div>
    </>
  );
};

export default BpmnCanvas;
