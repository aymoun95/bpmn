import React from "react";

interface BPMNContainerProps {
  children: React.ReactNode;
  bpmnClassName?: string;
  bpmnStyle?: React.CSSProperties;
}

export default function BPMNContainer({
  children,
  bpmnClassName = "",
  bpmnStyle = {},
}: BPMNContainerProps) {
  return (
    <div
      id="bpmncontainer"
      className={`flex shadow-2xl rounded-lg bg-white overflow-hidden ${bpmnClassName}`}
      style={{
        minHeight: "80vh",
        minWidth: "80vw",
        maxHeight: "90vh",
        ...bpmnStyle,
      }}
    >
      {children}
    </div>
  );
}
