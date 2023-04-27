import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header.jsx";
import Feed from "../../components/Feed/Feed.jsx";
import axios from "axios";
import styles from "./Main.module.scss";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5003");

const Main = () => {
  const [news, setNews] = useState([]);
  const [post, setPost] = useState([]);
  // axios
  //   .get(
  //     "https://newsapi.org/v2/top-headlines?category=technology&apiKey=e66f147624c7460b9f536a95eead2fe4"
  //   )
  //   .then((response) => {
  //     setNews(response.data.articles);
  //   });
  socket.emit("all_posts");
  useEffect(() => {
    socket.on("all_posts", (data) => {
      setPost(data);
    });
  }, [socket]);
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.news_container}>
          {news.map((el) => (
            <div>
              <p>{el.title}</p>
            </div>
          ))}
        </div>
        <Feed post={post} />
      </div>
    </>
  );
};

export default Main;
