let activeUsers = 0;
let editorLockedBy: string | null = null;

export const userJoin = () => ++activeUsers;
export const userLeave = () => --activeUsers;
export const getActiveUsers = () => activeUsers;

export const lockEditor = (userId: string) => {
  if (!editorLockedBy) {
    editorLockedBy = userId;
    return true;
  }
  return false;
};

export const unlockEditor = (userId: string) => {
  if (editorLockedBy === userId) {
    editorLockedBy = null;
    return true;
  }
  return false;
};

export const getEditorLock = () => editorLockedBy;
