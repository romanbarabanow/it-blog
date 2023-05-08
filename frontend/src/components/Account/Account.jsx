import React, { useState } from "react";
import bg from "../../image/bg3.jpg";
import styles from "./Account.module.scss";
import close from "../../image/close.png";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user";

const Account = ({ setReg }) => {
  const [email, setEmail] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [registration, setRegistration] = useState(false);
  const [failLogin, setFailLogin] = useState(false);
  const dispatch = useDispatch();

  const clickHandle = () => {
    if (registration == false) {
      axios
        .post("http://localhost:5002/login", {
          email: email,
          password: password,
        })
        .then((data) => {
          if (data.data.message == "FAIL") {
            setFailLogin(true);
          } else {
            setCookie("password", data.data.password);
            setCookie("email", data.data.email);
            setCookie("name", data.data.name);
            dispatch(
              setUser({
                name: data.data.name,
                avatar_link: data.data.avatar_link,
              })
            );
            setReg(false);
          }
        });
    }
    if (registration == true) {
      axios
        .post("http://localhost:5002/registration", {
          email: email,
          password: password,
          name: name,
        })
        .then((data) => {
          if (data.data.message == "OK") {
            setCookie("password", password);
            setCookie("email", email);
            setCookie("name", name);
            dispatch(setUser({ name: name, avatar_link: "" }));
            setReg(false);
          }
          console.log(data);
        });
    }
  };
  return (
    <div className={styles.main_container}>
      <img
        src={close}
        className={styles.close_img}
        onClick={() => {
          setReg(false);
        }}
      />
      <div className={styles.form_container}>
        <div className={styles.tittle}>
          <p>{registration ? "Регистрация" : "Вход"}</p>
        </div>
        <div className={styles.data_container}>
          <div className={styles.login}>
            <p>Почта</p>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className={styles.login}>
            <p>Пароль</p>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          {registration && (
            <>
              <div className={styles.login}>
                <p>Имя</p>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </>
          )}
          {failLogin && (
            <div style={{ color: "red", fontSize: "15px", marginTop: "30px" }}>
              Неверныый логин или пароль
            </div>
          )}
        </div>
        <button onClick={clickHandle}>
          {registration ? "Создать аккаунт" : "Войти"}
        </button>
        <div
          className={styles.non_account}
          onClick={() => {
            setRegistration(true);
            setFailLogin(false);
            setEmail("");
            setPassword("");
          }}
        >
          Нет аккаунта?
        </div>
      </div>
      <div className={styles.image_container}>
        <img src={bg} />
      </div>
    </div>
  );
};

export default Account;
