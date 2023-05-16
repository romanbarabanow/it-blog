import { useEffect, useState } from "react";
import Header from "../../components/Header/Header.jsx";
import Feed from "../../components/Feed/Feed.jsx";
import styles from "./Main.module.scss";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5003");

const Main = () => {
  const [post, setPost] = useState([]);
  socket.emit("all_posts");
  useEffect(() => {
    socket.on("all_posts", (data) => {
      const newArray = [];
      data.forEach((el) => {
        newArray.unshift(el);
      });
      setPost(newArray);
    });
  }, [socket]);
  return (
    <div className={styles.main_container}>
      <Header />
      <div className={styles.container}>
        <Feed post={post} />
      </div>
    </div>
  );
};

export default Main;
