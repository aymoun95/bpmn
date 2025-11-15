// hooks/useBpmnModelerInstance.ts
import BpmnModeler from "bpmn-js/lib/Modeler";
import { useEffect, useRef } from "react";

export function useBpmnModelerInstance(id: string) {
  const modelerRef = useRef<BpmnModeler | null>(null);

  useEffect(() => {
    const instance = new BpmnModeler({
      container: `#${id}`,
    });

    modelerRef.current = instance;
  }, [id]);

  return modelerRef;
}
