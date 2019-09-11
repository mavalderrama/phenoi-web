import users_reducer from "./users_reducer";
import auth_reducer from "./auth_reducer";
import drawer_reducer from "./drawer_reducer";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  users_reducer: users_reducer,
  auth_reducer: auth_reducer,
  drawer_reducer: drawer_reducer,
  form: formReducer
});
