const defaultStore = {
  post: [],
};

const SET_POST = "SET_POST";

export default function postReducer(state = defaultStore, action) {
  switch (action.type) {
    case SET_POST:
      return { post: action.payload };
    default:
      return state;
  }
}

export const setPost = (data) => ({ type: SET_POST, payload: data });
