import styles from "./Registration.module.scss";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5005");
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

const Registration = ({ setReg, setProfile }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPasword] = useState("");
  const registrationHandle = () => {
    socket.emit("registration", { name, login, password });
    setCookie("email", login);
    setCookie("name", name);
  };
  useEffect(() => {
    socket.on("regData", (data) => {
      if (data.data) {
        setCookie("email", data.data.email);
        setCookie("name", data.data.name);
        window.location.reload();
      }
    });
  }, [socket]);
  return (
    <div
      className={styles.main_container}
      onClick={() => {
        setReg(false);
      }}
    >
      <div
        className={styles.reg_container}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <p>Регистрация</p>
        <div className={styles.data}>
          <div>
            <p>Имя</p>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <p>Почта</p>
            <input
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
              }}
            />
          </div>
          <div>
            <p>Пароль</p>
            <input
              value={password}
              onChange={(e) => {
                setPasword(e.target.value);
              }}
            />
          </div>
        </div>
        <button className={styles.button} onClick={registrationHandle}>
          Создать Аккаунт
        </button>
      </div>
    </div>
  );
};

export default Registration;
