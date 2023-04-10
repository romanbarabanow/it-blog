import React from "react";
import styles from "./Header.module.scss";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const [cookie, setCookie, removeCookie] = useCookies();
  return (
    <div>
      <div className={styles.first_block} />
      <div className={styles.second_block}>
        <div className={styles.navigation}>
          <p>Посты</p>
          <p>Пользователи</p>
          <p>Форум</p>
        </div>
        <div className={styles.userBlock}>
          <p>{user.name}</p>
          <p
            className={styles.go_out}
            onClick={() => {
              removeCookie("token", { path: "/" });
              window.location.reload();
            }}
          >
            Выход
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
