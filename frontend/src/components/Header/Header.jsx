import styles from "./Header.module.scss";
import { useEffect, useState } from "react";
import Registration from "../Registration/Registration.jsx";
import { useCookies } from "react-cookie";
import ProfileHeader from "../ProfileHeader/ProfileHeader.jsx";
import { NavLink } from "react-router-dom";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5002");

const Header = () => {
  const [loginInput, setLoginInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [login, setLogin] = useState(false);
  const [reg, setReg] = useState(false);
  const [profile, setProfile] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const loginToAccount = () => {
    socket.emit("loginWithData", { email: loginInput, password: passInput });
  };
  socket.emit("login", { email: cookies.email });
  useEffect(() => {
    socket.on("data for login", (data) => {
      if (data.data) {
        setProfile(true);
        setLogin(false);
      }
    });
    socket.on("token", (data) => {
      if (data.user) {
        setCookie("name", data.user.name);
        setCookie("email", data.user.email);
        setProfile(true);
        setLogin(false);
      }
    });
  }, [socket]);

  return (
    <>
      {reg && <Registration setReg={setReg} setProfile={setProfile} />}
      <div className={styles.main_container}>
        <div className={styles.navigation_container}>
          <NavLink style={{ color: "black", textDecoration: "none" }} to="/">
            <p>Главная</p>
          </NavLink>
          <p>Форум</p>
          <NavLink
            style={{ color: "black", textDecoration: "none" }}
            to="/test"
          >
            <p>Тест</p>
          </NavLink>
          <NavLink
            style={{ color: "black", textDecoration: "none" }}
            to="/users"
          >
            <p>Пользователи</p>
          </NavLink>
          <NavLink
            style={{ color: "black", textDecoration: "none" }}
            to="/chat"
          >
            <p>Чат</p>
          </NavLink>
        </div>
        <div className={styles.account_container}>
          <ProfileHeader
            profile={profile}
            setLogin={setLogin}
            login={login}
            setProfile={setProfile}
          />
        </div>
      </div>
      {login && (
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
      )}
    </>
  );
};

export default Header;
