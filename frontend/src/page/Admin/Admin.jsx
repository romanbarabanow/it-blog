import React, { useEffect, useState } from "react";
import styles from "./Admin.module.scss";
import io from "socket.io-client";
const socketPost = io.connect("http://localhost:5003");
const socketForum = io.connect("http://localhost:5004");
import Post from "../../components/Post/Post";

const Admin = () => {
  const [queastion, setQuestion] = useState([]);
  const [input, setInput] = useState("");
  const [view, setView] = useState(true);
  const [post, setPost] = useState([]);
  const [viewPost, setViewPost] = useState(false);
  const [viewForum, setViewForum] = useState(true);
  socketForum.emit("all_question");
  useEffect(() => {
    socketPost.on("all_posts", (data) => {
      const newArray = [];
      data.forEach((el) => {
        newArray.unshift(el);
      });
      setPost(newArray);
    });
    socketForum.on("all", (data) => {
      const newArray = [];
      data.forEach((el) => {
        newArray.unshift(el);
      });
      setQuestion(newArray);
    });
  }, [socketPost, socketForum]);
  return (
    <div className={styles.main_container}>
      {view ? (
        <div className={styles.forma}>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button
            onClick={() => {
              if (input == "123") {
                setView(false);
              }
            }}
          >
            Продолжить
          </button>
        </div>
      ) : (
        <>
          <div className={styles.navigation} onClick={() => {}}>
            <p
              onClick={() => {
                socketPost.emit("all_posts");
                setViewPost(true);
                setViewForum(false);
              }}
            >
              Посты
            </p>
            <p
              onClick={() => {
                setViewPost(false);
                setViewForum(true);
              }}
            >
              Форум
            </p>
          </div>
          <div
            className={styles.container}
            onClick={() => {
              console.log(queastion);
            }}
          >
            {viewPost && (
              <div>
                {post.map((el) => (
                  <div className={styles.post_container}>
                    <Post post={el} need={true} />
                    <button
                      onClick={() => {
                        socketPost.emit("delete-post-admin", { id: el._id });
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                ))}
              </div>
            )}
            {viewForum && (
              <div
                className={styles.forum_container}
                onClick={() => {
                  console.log(queastion);
                }}
              >
                {queastion.map((elem, index) => (
                  <>
                    <div className={styles.question}>
                      <div className={styles.question_main_container}>
                        <div className={styles.numberofanswers}>
                          <p>{elem.answers} ответов</p>
                        </div>
                        <div className={styles.text_container}>
                          <p>{elem.question}</p>
                        </div>
                      </div>
                      <div className={styles.image}>
                        <img src={elem.avatar} />
                        <p>{elem.author}</p>
                      </div>
                    </div>
                    <button
                      className={styles.button_forum}
                      onClick={() => {
                        socketForum.emit("delete-question", { id: elem._id });
                      }}
                    >
                      Удалить
                    </button>
                  </>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;
