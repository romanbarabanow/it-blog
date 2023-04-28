import React, { useEffect, useState } from "react";
import styles from "./Forum.module.scss";
import { NavLink } from "react-router-dom";
import io from "socket.io-client";
import Header from "../../components/Header/Header";
const socket = io.connect("http://localhost:5004");

const Forum = () => {
  socket.emit("all_question");
  const [queastion, setQuestion] = useState([]);

  useEffect(() => {
    socket.on("all_question", (data) => {
      const newArray = [];
      data.forEach((el) => {
        newArray.unshift(el);
      });
      setQuestion(newArray);
    });
  }, [socket]);
  return (
    <>
      <Header />
      <div className={styles.main_container}>
        <div className={styles.container}>
          <div className={styles.text}>
            <p>Вопросы</p>
            <NavLink to="/forum-ask">
              <button>Задать вопрос</button>
            </NavLink>
          </div>
          <div className={styles.question_container}>
            {queastion.map((el) => (
              <NavLink
                to={`/forum-answers?id=${el._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div
                  className={styles.question}
                  onClick={() => {
                    console.log(el);
                  }}
                >
                  <div className={styles.question_main_container}>
                    <div className={styles.numberofanswers}>
                      <p>{el.answers} ответов</p>
                    </div>
                    <div className={styles.text_container}>
                      <p>{el.question}</p>
                    </div>
                  </div>
                  <div className={styles.image}>
                    <img src={el.avatar} />
                    <p>{el.author}</p>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Forum;
