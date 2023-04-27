import styles from "./ProfileHeader.module.scss";
import { useCookies } from "react-cookie";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5005");

const ProfileHeader = ({ profile, setLogin, login, setProfile }) => {
  const [menu, setMenu] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  return (
    <>
      <div className={styles.main_container}>
        {profile ? (
          <p
            className={styles.text}
            onClick={() => {
              setMenu(!menu);
            }}
          >
            Профиль
          </p>
        ) : (
          <p
            onClick={() => {
              setLogin(!login);
            }}
          >
            Войти
          </p>
        )}
      </div>
      {menu && (
        <div className={styles.something}>
          <p>
            <NavLink
              to={"/profile"}
              style={{ textDecoration: "none", color: "black" }}
            >
              Мой профиль
            </NavLink>
          </p>
          <p>
            <NavLink
              to={"/profile-settings"}
              style={{ textDecoration: "none", color: "black" }}
            >
              Настройка профиля
            </NavLink>
          </p>
          <p
            onClick={() => {
              removeCookie("email");
              removeCookie("name");
              window.location.reload("/");
            }}
          >
            Выйти
          </p>
        </div>
      )}
    </>
  );
};

export default ProfileHeader;
