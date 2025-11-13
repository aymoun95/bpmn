import React from "react";
import { useBpmnModeler } from "../hooks/useBpmnModeler";
import UserCount from "./UserCount";

interface ModelerProps {
  id?: string;
  className?: string;
}

const Modeler: React.FC<ModelerProps> = ({
  id = "bpmnview",
  className = "",
}) => {
  const { userCount } = useBpmnModeler(id);

  return (
    <>
      <UserCount userCount={userCount} />
      <div
        id={id}
        className={`bg-gray-50 border-r border-gray-200 ${className}`}
      ></div>
    </>
  );
};

export default Modeler;
