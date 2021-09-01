import { combineReducers } from "redux";
import { user } from './users'
import themeReducer from "./theme";

const Reducers = combineReducers({
    userState: user,
    theme: themeReducer,
})

export default Reducers;