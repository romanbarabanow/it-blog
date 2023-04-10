import axios from "axios";
import { setUsers } from "../store/UserReducer";

export const registration = (name, email, password) => {
  return async (dispatch) => {
    console.log(name, email, password);
    const res = await axios.post(
      "http://localhost:8080/api/reg",
      {
        name: name,
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data.token);
    dispatch(
      setUsers({
        name: name,
        email: email,
        token: res.data.token,
      })
    );
  };
  s;
};

export const authLogin = (email, password) => {
  return async (dispatch) => {
    console.log(email, password);
  };
};
