import React, { useState } from "react";
import styles from "./Registration.module.scss";
import bg from "../../assets/image/bgone.jpeg";
import { registration } from "../../action/auth";
import { useDispatch, useSelector } from "react-redux";

const Registration = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const reg = async () => {
    console.log(name, email, password);
    const data = dispatch(registration(name, email, password));
    if (data === "Error") {
      alert("Такой пользователь уже существует");
    }
  };
  return (
    <div className={styles.main_contianer}>
      <div className={styles.login_container}>
        <p>Зарегистрироваться</p>
        <div>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Введите никнейм"
          />
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
        <button onClick={reg}>Зарегистрироваться</button>
      </div>
      <img src={bg} alt="" className={styles.bg} />
    </div>
  );
};

export default Registration;
