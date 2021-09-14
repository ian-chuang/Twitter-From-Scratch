const initialState = {
  firebaseUser: null,
  user: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_FIREBASE_USER":
      return { ...state, firebaseUser: action.payload };
    default:
      return state;
  }
}
