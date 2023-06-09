import styles from "./Post.module.scss";
import commentaryImg from "../../image/commmentary.png";
import laik from "../../image/laik.png";
import Commentary from "../Commentaty/Commentary";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPost } from "../../store/post";
const socket = io.connect("http://localhost:5003");

const Post = (props) => {
  const [commentaryView, setCommentaryView] = useState(false);
  const post = props.post;
  const dispatch = useDispatch();
  const needCommentary = props.need ? false : true;
  const [likes, setLike] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    socket.on("likes", (data) => {
      if (data._id === post._id) {
        console.log(data);
        setLike(data.likes);
      }
    });
    socket.on("unlikes", (data) => {
      if (data._id === post._id) {
        console.log(data);
        setLike(data.likes);
      }
    });
  }, [socket]);
  return (
    <>
      <div className={styles.container} key={post._id}>
        <div className={styles.top_container}>
          <p
            className={styles.name}
            onClick={() => {
              console.log(post._id);
            }}
          >
            {post.name}
          </p>
          <p className={styles.tittle}>{post.tittle}</p>
        </div>
        <div className={styles.text_container}>{post.text}</div>
        <div className={styles.img_container}>
          <img src={post.img_link} />
        </div>
        {needCommentary && (
          <div className={styles.commentary}>
            <p>{likes}</p>
            <img
              src={laik}
              onClick={() => {
                if (isLiked == false) {
                  socket.emit("like", { id: post._id });
                  setIsLiked(!isLiked);
                }
                if (isLiked == true) {
                  socket.emit("unlike", { id: post._id });
                  setIsLiked(!isLiked);
                }
              }}
            />
            <NavLink
              to={`/commentary?id=${post._id}`}
              onClick={() => {
                dispatch(setPost(post));
              }}
            >
              <img src={commentaryImg} />
            </NavLink>
          </div>
        )}
      </div>
      {commentaryView && (
        <Commentary post={post} setCommentaryView={setCommentaryView} />
      )}
    </>
  );
};

export default Post;
