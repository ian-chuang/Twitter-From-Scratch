export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const setFirebaseUser = (firebaseUser) => {
  return {
    type: "SET_FIREBASE_USER",
    payload: firebaseUser,
  };
};

export const toggleTheme = () => {
  return {
    type: "TOGGLE_THEME",
  };
};
