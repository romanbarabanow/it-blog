import React, { useEffect, useState } from "react";
import styles from "./AnswersForForum.module.scss";
import io from "socket.io-client";
import { NavLink, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
const socket = io.connect("http://localhost:5004");
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const AnswersForForum = () => {
  const [answer, setAnswer] = useState("");
  const [queryParameters] = useSearchParams();
  const [answers, setAnswers] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();
  const user = useSelector((state) => state.user.user); // questionId, author, answer, avatar_link
  const [el, setEl] = useState({});
  const [codeView, setCodeView] = useState(false);
  const [code, setCode] = useState(``);
  const [language, setLanguage] = useState(``);
  const sendAnswer = () => {
    socket.emit("new_answer", {
      questionId: queryParameters.get("id"),
      author: user.name,
      answer,
      avatar_link: user.avatar_link,
    });
    setAnswer("");
  };

  socket.emit("answer", { id: queryParameters.get("id") });
  socket.emit("findQuestion", { id: queryParameters.get("id") });
  useEffect(() => {
    socket.on("answer", (data) => {
      const newArray = [];
      data.forEach((el) => {
        newArray.unshift(el);
      });
      setAnswers(newArray);
    });
    socket.on("question", (data) => {
      setEl(data);
      setLanguage(data.codeObj.language);
      setCode(data.codeObj.code);
      if (data.codeObj.isHere == 1) {
        setCodeView(true);
      }
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
      <div className={styles.body}>{el.body}</div>
      <div className={styles.code_link}>
        {codeView && (
          <SyntaxHighlighter
            language={language}
            style={atomDark}
            className={styles.code_link}
          >
            {code}
          </SyntaxHighlighter>
        )}
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
