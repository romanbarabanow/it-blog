import React, { useEffect } from "react";
import Post from "../Post/Post";
import deletePostImg from "../../image/delete.png";

import io from "socket.io-client";
const socket = io.connect("http://localhost:5003");

const UserPost = ({ post, setMyPosts }) => {
  const postsUsers = () => {
    if (post.lenght === 0) {
      return <p>Постов Нет</p>;
    }
    return post.map((el) => (
      <>
        <Post key={el._id} post={el} need={true} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            width: "100px",
            marginTop: "10px",
          }}
          onClick={() => {
            socket.emit("delete-post", { id: el._id, name: el.name });
          }}
        >
          <img
            src={deletePostImg}
            style={{
              cursor: "pointer",
              width: "30px",
              height: "30px",
              margin: "10px",
            }}
          />
          <p>Удалить</p>
        </div>
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
