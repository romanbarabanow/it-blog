import React, { useEffect } from "react";
import Post from "../Post/Post";

import io from "socket.io-client";
const socket = io.connect("http://localhost:5005");

const UserPost = ({ post, setMyPosts }) => {
  const postsUsers = () => {
    if (post.lenght === 0) {
      return <p>Постов Нет</p>;
    }
    return post.map((el) => (
      <>
        <Post key={el._id} post={el} />
        <p
          onClick={() => {
            socket.emit("delete-post", { id: el._id, name: el.name });
          }}
          style={{ cursor: "pointer" }}
        >
          Удалить
        </p>
      </>
    ));
  };
  useEffect(() => {
    socket.on("newPost", (data) => {
      console.log(data.data);
      if (data.data) {
        const newArray = [];
        data.data.forEach((el) => {
          newArray.unshift(el);
        });
        setMyPosts(newArray);
      }
    });
  }, [socket]);
  return <>{postsUsers()}</>;
};

export default UserPost;
