export const getAuthorizationHeader = (currentUser) => {
  if (currentUser) return `Bearer ${currentUser.token}`;
  else return undefined;
  };
  