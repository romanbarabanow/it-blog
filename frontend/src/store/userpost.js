const defaultState = {
  post: [],
};

const SET_POST = "SET_POST";

export default function userPostReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_POST:
      return { post: action.payload };
    default:
      return state;
  }
}

export const setUserPost = (data) => ({ type: SET_POST, payload: data });
