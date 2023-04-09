import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import userReducer from "./UserReducer";
import PostReducer from "./PostReducer";

const rootReducer = combineReducers({
  user: userReducer,
  post: PostReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
