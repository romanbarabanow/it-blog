import React, { useEffect } from "react";
import styles from "./InputLogin.module.scss";
import { useCookies } from "react-cookie";

const InputLogin = ({
  loginInput,
  setLoginInput,
  setPassInput,
  setLogin,
  setReg,
  passInput,
  setProfile,
  loginToAccount,
}) => {
  return (
    <div className={styles.help}>
      <div className={styles.login_container}>
        <div className={styles.input}>
          <p>Логин</p>
          <input
            placeholder={"Введите логин"}
            value={loginInput}
            onChange={(e) => {
              setLoginInput(e.target.value);
            }}
          />
        </div>
        <div className={styles.input}>
          <p>Пароль</p>
          <input
            placeholder="Введите пароль"
            type="password"
            value={passInput}
            onChange={(e) => {
              setPassInput(e.target.value);
            }}
          />
        </div>
        <button
          onClick={() => {
            loginToAccount();
          }}
        >
          Войти
        </button>
        <div className={styles.reg}>
          <p
            onClick={() => {
              setLogin(false);
              setReg(true);
            }}
          >
            Регистрация
          </p>
        </div>
      </div>
    </div>
  );
};

export default InputLogin;
