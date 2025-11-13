type UserCountProps = {
  userCount: number;
};

const UserCount = ({ userCount }: UserCountProps) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "#222",
        color: "white",
        padding: "6px 12px",
        borderRadius: "8px",
        fontSize: "14px",
        opacity: 0.8,
      }}
    >
      👥 {userCount} user{userCount !== 1 ? "s" : ""} online
    </div>
  );
};

export default UserCount;
