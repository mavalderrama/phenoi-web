import { createStore } from "redux";
import rootReducer from "../Redux/reducers/index";
const store = createStore(rootReducer);
export default store;
