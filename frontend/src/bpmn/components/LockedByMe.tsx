import React from "react";

const LockedByMe: React.FC = () => (
  <span
    style={{
      marginLeft: 8,
      color: "black",
      fontWeight: "bold",
      position: "absolute",
      top: 8,
      right: 16,
      zIndex: 11,
    }}
  >
    📝 You are editing
  </span>
);

export default LockedByMe;
