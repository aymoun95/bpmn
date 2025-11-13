// Join user to chat
const userJoin = (users: number) => {
  return users + 1;
};
// User leaves chat
const userLeave = (users: number) => {
  return users - 1;
};

export { userJoin, userLeave };
