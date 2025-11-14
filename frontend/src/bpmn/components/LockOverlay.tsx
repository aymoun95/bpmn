import React from "react";

interface LockOverlayProps {
  lockedBy: string;
}

const LockOverlay: React.FC<LockOverlayProps> = ({ lockedBy }) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(255,200,0,0.2)",
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 24,
      fontWeight: "bold",
    }}
  >
    🔒 Locked by {lockedBy}
  </div>
);

export default LockOverlay;
