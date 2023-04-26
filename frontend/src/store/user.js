const defaultState = {
  user: {},
};
const SET_USER = "SET_USER";

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };

    default:
      return state;
  }
}

export const setUser = (data) => ({ type: SET_USER, payload: data });
