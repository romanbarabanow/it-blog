const SET_POST = "SET_POST";

const defaultState = {
  posts: [],
};

export default function PostReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_POST:
      return { posts: action.payload };
    default:
      return state;
  }
}

export const setPosts = (data) => ({ type: SET_POST, payload: data });
