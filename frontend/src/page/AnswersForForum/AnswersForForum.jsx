import React, { useEffect, useState } from "react";
import styles from "./AnswersForForum.module.scss";
import io from "socket.io-client";
import { NavLink, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
const socket = io.connect("http://localhost:5004");

const AnswersForForum = () => {
  const [answer, setAnswer] = useState("");
  const [queryParameters] = useSearchParams();
  const [answers, setAnswers] = useState([]);
  const [answerToQuestion, setAnswerToQuestion] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();
  const user = useSelector((state) => state.user.user); // questionId, author, answer, avatar_link
  const [el, setEl] = useState({});
  const sendAnswer = () => {
    socket.emit("new_answer", {
      questionId: queryParameters.get("id"),
      author: cookies.name,
      answer,
      avatar_link: user.avatar_link,
    });
  };

  socket.emit("answer", { id: queryParameters.get("id") });
  socket.emit("findQuestion", { id: queryParameters.get("id") });
  useEffect(() => {
    socket.on("newAnswer", (data) => {
      const newArray = [];
      data.forEach((el) => {
        newArray.unshift(el);
      });
      setAnswers(newArray);
    });
    socket.on("answer", (data) => {
      const newArray = [];
      data.forEach((el) => {
        newArray.unshift(el);
      });
      setAnswers(newArray);
    });
    socket.on("question", (data) => {
      setEl(data);
    });
  }, [socket]);
  return (
    <div className={styles.main_container}>
      <div className={styles.goback}>
        <NavLink
          style={{ textDecoration: "none", color: "black" }}
          to={"/forum"}
        >
          <p>Назад</p>
        </NavLink>
      </div>
      <div className={styles.question_container}>{el.question}</div>
      <div
        className={styles.body}
        onClick={() => {
          console.log(answerToQuestion);
        }}
      >
        {el.body}
      </div>
      <div className={styles.user}>
        <img src={el.avatar} />
        <p>{el.author}</p>
      </div>
      <div className={styles.input_container}>
        <textarea
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        />
        <button onClick={sendAnswer}>Ответить</button>
      </div>
      <div className={styles.answers_container}>
        {answers.map((el) => (
          <div className={styles.answer}>
            {el.answer}
            <div className={styles.user_container}>
              <img src={el.avatar} />
              <p>{el.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswersForForum;
