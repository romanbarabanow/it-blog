import React, { useEffect, useState } from "react";
import styles from "./User.module.scss";
import Header from "../../components/Header/Header";
import io from "socket.io-client";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";
const socket = io.connect("http://localhost:5005");

const Users = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [users, setUsers] = useState([]);
  socket.emit("all-users");
  const userList = () => {
    if (users.length === 0) {
      return "";
    } else {
      return users.map(function (el) {
        if (el.email !== cookies.email) {
          return (
            <div className={styles.user_container}>
              <div>
                <img src={el.avatar_link} className={styles.image} />
                <p className={styles.text}>{el.name}</p>
              </div>
              <div>
                <NavLink
                  to={`/chat?friendId=${el._id}&type=createroom`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <p style={{ cursor: "pointer" }}>Написать</p>
                </NavLink>
                <p style={{ cursor: "pointer" }}>Профиль</p>
              </div>
            </div>
          );
        }
      });
    }
  };
  useEffect(() => {
    socket.on("users", (data) => {
      if (data.data) {
        setUsers(data.data);
      }
    });
  }, [socket]);
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.main_container}>{userList()}</div>
      </div>
    </>
  );
};

export default Users;
