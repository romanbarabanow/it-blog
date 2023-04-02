const SET_USER = "SET_USER";
const SET_AUTH_FALSE = "SET_AUTH_FALSE";

const defaultState = {
  user: {},
  isAuth: false,
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload, isAuth: true };
    case SET_AUTH_FALSE:
      return { ...state, isAuth: false };
    default:
      return state;
  }
}

export const setUsers = (data) => ({ type: SET_USER, payload: data });
export const setAuth = () => ({ type: SET_AUTH_FALSE });
