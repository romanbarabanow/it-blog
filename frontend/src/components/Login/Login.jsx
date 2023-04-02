import React, { useState } from "react";
import styles from "./Login.module.scss";
import bg from "../../assets/image/bgONe.jpeg";
import { NavLink } from "react-router-dom";
import { authLogin } from "../../action/auth";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUsers } from "../../store/UserReducer";
import { useCookies } from "react-cookie";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies();
  const loginHandle = async () => {
    const res = await axios.post(
      "http://localhost:8080/api/auth/login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      dispatch(
        setUsers({
          name: res.data.name,
          email: email,
          token: res.data.token,
        })
      );
      setCookie("token", res.data.token);
    }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.login_container}>
        <p>Войти</p>
        <div>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Введите почту"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Введите пароль"
          />
        </div>
        <button onClick={loginHandle}>Войти</button>
        <NavLink to="/registration" style={{ textDecoration: "none" }}>
          <p className={styles.no_accaout}>Нет аккаунта?</p>
        </NavLink>
      </div>
      <img src={bg} alt="" className={styles.bg} />
    </div>
  );
};

export default Login;
