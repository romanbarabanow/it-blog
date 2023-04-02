import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import Main from "./pages/Main/Main";
import Registration from "./components/Registration/Registration";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUsers } from "./store/UserReducer";

const App = () => {
  // const [cookies, setCookie, removeCookie] = useCookies();
  const auth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies();
  async function start() {
    if (cookies.token) {
      const res = await axios.get("http://localhost:8080/api/auth/auth", {
        token: cookies.token,
      });
      if (res.status === 200) {
        console.log(res);
        dispatch(
          setUsers({
            name: res.data.name,
            email: res.data.email,
          })
        );
      }
    }
  }
  start();
  return (
    <div>
      {auth ? (
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
