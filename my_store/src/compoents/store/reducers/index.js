import { combineReducers } from "redux";
import reducer from "./reducer";

const rootReducer = combineReducers({
  infoRd: reducer,
});

export default rootReducer;
