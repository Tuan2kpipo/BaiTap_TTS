import { combineReducers } from "redux";
import reducer from "./reducer";
import user from "./user";

const rootReducer = combineReducers({
  infoRd: reducer,
  infoUS: user,
});

export default rootReducer;
