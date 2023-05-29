import React, { useState } from "react";
import styles from "./AnswerForum.module.scss";
import img from "../../image/img.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import axios from "axios";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const AnswerForum = () => {
  const [codeView, setCodeView] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });
  const user = useSelector((state) => state.user.user);
  const [message, setMessage] = useState(false);
  const dispatch = useDispatch();
  const sendQuestion = (data) => {
    if (codeView == false) {
      axios
        .post("http://localhost:5004/create", {
          author: user.name,
          avatar: user.avatar_link,
          question: data.question,
          body: data.body,
          code: data.code,
          isHere: 0,
          language: data.codeLanguage,
        })
        .then((data) => {
          if (data.data.message == "OK") {
            setMessage(true);
            reset();
          }
        });
    }
    if (codeView == true) {
      axios
        .post("http://localhost:5004/create", {
          author: user.name,
          avatar: user.avatar_link,
          question: data.question,
          body: data.body,
          code: data.code,
          isHere: 1,
          language: data.codeLanguage,
        })
        .then((data) => {
          if (data.data.message == "OK") {
            setMessage(true);
            reset();
          }
        });
    }
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
        <form onSubmit={handleSubmit(sendQuestion)}>
          <label className={styles.question_label}>
            Ваш вопрос
            <input
              {...register("question", {
                minLength: 10,
              })}
            />
            <div>
              {errors?.question && (
                <p className={styles.error_text}>
                  Минимальная длинна 10 символов!
                </p>
              )}
            </div>
          </label>
          <label className={styles.body_label}>
            Опишите подробнее вопрос
            <textarea
              {...register("body", {
                minLength: 70,
              })}
            />
            <div>
              {errors?.body && (
                <p className={styles.error_text}>
                  Минимальная длинна 70 символов!
                </p>
              )}
            </div>
          </label>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              setCodeView(!codeView);
            }}
          >
            Прикрепить код
          </p>
          {codeView && (
            <label className={styles.code_label}>
              Ваш код
              <select className={styles.select} {...register("codeLanguage")}>
                <option className={styles.select} value={"javascript"}>
                  JavaScript
                </option>
                <option className={styles.select} value={"css"}>
                  CSS
                </option>
                <option className={styles.select} value={"go"}>
                  Go
                </option>
                <option className={styles.select} value={"java"}>
                  Java
                </option>
                <option className={styles.select} value={"cpp"}>
                  C++
                </option>
                <option className={styles.select} value={"python"}>
                  Python
                </option>
              </select>
              <textarea {...register("code")} />
            </label>
          )}

          <button className={styles.submit}>Отправить</button>
        </form>
      </div>

      {/* <SyntaxHighlighter language="cpp" style={atomDark}></SyntaxHighlighter> */}
    </div>
  );
};

export default AnswerForum;
