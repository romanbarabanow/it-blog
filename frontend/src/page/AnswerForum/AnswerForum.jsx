import React, { useEffect, useState } from "react";
import styles from "./AnswerForum.module.scss";
import img from "../../image/img.png";
import io from "socket.io-client";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const socket = io.connect("http://localhost:5004");
import axios from "axios";

const AnswerForum = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const user = useSelector((state) => state.user.user);
  const [message, setMessage] = useState(false);
  const [question, setQuestion] = useState("");
  const [body, setBody] = useState("");
  const sendQuestion = () => {
    axios
      .post("http://localhost:5004/create", {
        author: user.name,
        avatar: user.avatar_link,
        question,
        body,
      })
      .then((data) => {
        if (data.data.message == "OK") {
          setMessage(true);
        }
      });
  };

  return (
    <div className={styles.main_container}>
      {message && (
        <div className={styles.message_container}>
          Успешно!
          <NavLink className={styles.link} to="/forum">
            <p>Вернуться</p>
          </NavLink>
        </div>
      )}
      <div className={styles.answer_question}>
        <p>Задайте свой вопрос</p>
        <img src={img} />
      </div>
      <div className={styles.question}>
        <p>Ваш вопрос</p>
        <input
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
      </div>
      <div className={styles.body}>
        <p>Опишите поподробнее вашу проблему</p>
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
      </div>
      <button onClick={sendQuestion}>Опубликовать</button>
    </div>
  );
};

export default AnswerForum;
