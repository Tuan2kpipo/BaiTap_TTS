import { combineReducers } from "redux";
import reducer from "./Product";
import user from "./User";

const rootReducer = combineReducers({
  infoRd: reducer,
  infoUS: user,
});

export default rootReducer;
