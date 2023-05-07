import { combineReducers, createStore } from "redux";
import userReducer from "./user.js";
import postReducer from "./post.js";

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
});

export const store = createStore(rootReducer);
