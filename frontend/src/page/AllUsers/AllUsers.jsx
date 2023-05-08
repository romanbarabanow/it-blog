import React, { useEffect, useState } from "react";
import styles from "./AllUsers.module.scss";
import Header from "../../components/Header/Header";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import Post from "../../components/Post/Post";
const socket = io.connect("http://localhost:5002");
const socketPost = io.connect("http://localhost:5003");

const AllUsers = () => {
  const [users, setUsers] = useState({});
  const [posts, setPosts] = useState([]);
  const [queryParameters] = useSearchParams();
  socket.emit("user-data", { email: queryParameters.get("email") });
  socketPost.emit("myPost", { email: queryParameters.get("name") });
  const postFilter = () => {
    if (posts.lenght != 0) {
      return posts.map((el) => <Post post={el} key={el.id} />);
    } else {
      return <p>Нет постов</p>;
    }
  };
  useEffect(() => {
    socket.on("user-data", (data) => {
      setUsers(data);
    });
    socketPost.on("post", (data) => {
      setPosts(data.data);
    });
  }, [socket, socketPost]);
  return (
    <div style={{ display: "flex" }}>
      <Header />
      <div className={styles.container}>
        <div
          className={styles.user_container}
          onClick={() => {
            console.log(posts);
          }}
        >
          <img src={users.avatar_link} />
          <p>{users.name}</p>
        </div>
        <div className={styles.posts_container}>{postFilter()}</div>
      </div>
    </div>
  );
};

export default AllUsers;
