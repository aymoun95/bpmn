import React from "react";
import { useBpmnModeler } from "../hooks/useBpmnModeler";

interface ModelerProps {
  id?: string;
  className?: string;
}

const Modeler: React.FC<ModelerProps> = ({
  id = "bpmnview",
  className = "",
}) => {
  useBpmnModeler(id);

  return (
    <>
      <div
        id={id}
        className={`bg-gray-50 border-r border-gray-200 ${className}`}
      ></div>
    </>
  );
};

export default Modeler;
