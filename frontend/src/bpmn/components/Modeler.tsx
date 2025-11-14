import React, { Activity } from "react";
import { useBpmnModeler } from "../hooks/useBpmnModeler";
import LockOverlay from "./LockOverlay";
import LockedByMe from "./LockedByMe";
import UserCount from "./UserCount";

interface ModelerProps {
  id?: string;
  className?: string;
}

const Modeler: React.FC<ModelerProps> = ({
  id = "bpmnview",
  className = "",
}) => {
  const { userCount, isLocked, lockedBy, socketId } = useBpmnModeler(id);
  const isLockedByMe = isLocked && lockedBy === socketId;
  return (
    <>
      <UserCount userCount={userCount} />
      <div style={{ position: "relative" }}>
        <Activity
          mode={isLocked && lockedBy && !isLockedByMe ? "visible" : "hidden"}
        >
          <LockOverlay lockedBy={lockedBy ?? ""} />
        </Activity>
        <Activity mode={isLockedByMe ? "visible" : "hidden"}>
          <LockedByMe />
        </Activity>
        <div
          id={id}
          className={`bg-gray-50 border-r border-gray-200 ${className}`}
          style={{ minHeight: "80vh", minWidth: "80vw" }}
        ></div>
      </div>
    </>
  );
};

export default Modeler;
