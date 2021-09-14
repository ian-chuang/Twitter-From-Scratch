import { combineReducers } from "redux";
import userReducer from "./user";
import themeReducer from "./theme";

const Reducers = combineReducers({
  user: userReducer,
  theme: themeReducer,
});

export default Reducers;
