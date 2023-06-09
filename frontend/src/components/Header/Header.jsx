import styles from "./Header.module.scss";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import profileuser from "../../image/profile.png";
import main from "../../image/main.png";
import communication from "../../image/communication.png";
import chat from "../../image/chat.png";
import exit from "../../image/exit.png";
import test from "../../image/approval.png";
import Account from "../Account/Account";
import { setUser } from "../../store/user";
import userImg from "../../image/users.png";
import loginImg from "../../image/login.png";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const isReg = useSelector((state) => state.user.login);
  const dispatch = useDispatch();

  const [cookies, setCookie, removeCookie] = useCookies();
  const [reg, setReg] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:5002/login", {
        email: cookies.email,
        password: cookies.password,
      })
      .then((data) => {
        if (!data.data.message) {
          dispatch(setUser(data.data));
        }
      });
  }, [axios, cookies]);
  return (
    <>
      {reg && <Account setReg={setReg} />}
      <div
        className={styles.container}
        onClick={() => {
          console.log(isReg, user);
        }}
      >
        <div className={styles.text_container}>
          <p>It-Blog</p>
        </div>
        <div className={styles.profile_container}>
          {isReg ? (
            <>
              <img src={user.avatar_link} />
              <p>{user.name}</p>
            </>
          ) : (
            <>
              <img src={loginImg} />
              <p
                className={styles.loginIn}
                onClick={() => {
                  setReg(true);
                }}
              >
                Войти
              </p>
            </>
          )}
        </div>
        <div className={styles.navcontainer}>
          <div className={styles.container_nav}>
            <img src={profileuser} />
            <NavLink className={styles.text} to={"/profile"}>
              Мой профиль
            </NavLink>
          </div>
          <div
            className={styles.container_nav}
            style={{ width: "37%", marginRight: "13%" }}
          >
            <img src={main} />
            <NavLink className={styles.text} to={"/"}>
              Главная
            </NavLink>
          </div>
          <div
            className={styles.container_nav}
            style={{ width: "34%", paddingRight: "16%" }}
          >
            <img src={communication} />
            <NavLink className={styles.text} to={"/forum"}>
              Форум
            </NavLink>
          </div>
          <div
            className={styles.container_nav}
            style={{ width: "27%", marginRight: "23%" }}
          >
            <img src={chat} />
            <NavLink className={styles.text} to={"/chat"}>
              Чат
            </NavLink>
          </div>
          <div
            className={styles.container_nav}
            style={{ width: "28%", marginRight: "22%" }}
          >
            <img src={test} />
            <NavLink className={styles.text} to={"/test"}>
              Тест
            </NavLink>
          </div>
          <div
            className={styles.container_nav}
            // style={{ width: "24%", marginRight: "26%" }}
          >
            <img src={userImg} />
            <NavLink className={styles.text} to={"/users"}>
              Пользователи
            </NavLink>
          </div>
        </div>
        <div className={styles.exit_container}>
          <div
            onClick={() => {
              removeCookie("password");
              removeCookie("email");
              removeCookie("name");
              window.location.reload();
            }}
          >
            <img src={exit} />
            <p>Выйти</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
