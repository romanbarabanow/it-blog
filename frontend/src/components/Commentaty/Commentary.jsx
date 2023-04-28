import React, { useEffect, useState } from "react";
import styles from "./Commentary.module.scss";
import Post from "../Post/Post";
import io from "socket.io-client";
import arrow from "../../image/arrow.png";
import { useCookies } from "react-cookie";
import { NavLink, useSearchParams } from "react-router-dom";
const socket = io.connect("http://localhost:5003");

const Commentary = () => {
  const [queryParameters] = useSearchParams();
  socket.emit("get-commentary", { postid: queryParameters.get("id") });
  const [input, setInput] = useState("");
  const [commentary, setCommentary] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();
  const writeCommentary = () => {
    socket.emit("create-commentary", {
      postid: queryParameters.get("id"),
      author: cookies.name,
      message: input,
    });
    setInput("");
  };
  useEffect(() => {
    socket.on("commentary", (data) => {
      const newArray = [];
      data.data.forEach((el) => {
        newArray.unshift(el);
      });
      setCommentary(newArray);
    });
  }, [socket]);
  return (
    <div className={styles.main_container}>
      <div className={styles.goback}>
        <NavLink to="/">
          <img src={arrow} onClick={() => {}} />
        </NavLink>
      </div>
      <div className={styles.container}>
        <div className={styles.input_container}>
          <textarea
            placeholder="Напишите комментарий..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button onClick={writeCommentary}>Отправить</button>
        </div>
        <div className={styles.message_container}>
          {commentary.map((el) => (
            <div className={styles.commentary}>
              <div>
                <img src={el.avatar} />
                <p>{el.author}</p>
              </div>
              <p>{el.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Commentary;
