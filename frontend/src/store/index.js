import { combineReducers, createStore } from "redux";
import userReducer from "./user.js";
import postReducer from "./post.js";
import userPostReducer from "./userpost.js";

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  userpost: userPostReducer,
});

export const store = createStore(rootReducer);
