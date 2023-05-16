import { useState } from "react";
import styles from "./User.module.scss";
import Header from "../../components/Header/Header";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const [cookies] = useCookies();
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);
  axios.get("http://localhost:5002/users").then((response) => {
    setUsers(response.data);
  });

  const userWithOutMe = users.filter((user) => {
    return user.name != cookies.name;
  });

  const filterUsers = userWithOutMe.filter((user) => {
    return user.name.toLowerCase().includes(value.toLowerCase());
  });
  return (
    <div style={{ display: "flex" }}>
      <Header />
      <div className={styles.container}>
        <div className={styles.find_users}>
          <input
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
        <div className={styles.main_container}>
          {filterUsers.map(function (el, index) {
            if (cookies.name == el.name) {
              return "";
            }
            return (
              <div className={styles.user_container} key={index}>
                <div>
                  <img src={el.avatar_link} className={styles.image} />
                  <p className={styles.text}>{el.name}</p>
                </div>
                <div>
                  <NavLink
                    to={`/chat?friendName=${el.name}&type=createroom&avatar=${el.avatar_link}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <p style={{ cursor: "pointer" }}>Написать</p>
                  </NavLink>
                  <NavLink
                    to={`/user?email=${el.email}&name=${el.name}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <p style={{ cursor: "pointer" }}>Профиль</p>
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Users;
