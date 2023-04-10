import React, { useState } from "react";
import styles from "./Post.module.scss";
import commentary from "../../Image/commentary.png";
import profile from "../../Image/profile.png";
import likes from "../../Image/like.png";
import active_like from "../../Image/activeLike.png";

const Post = (props) => {
  const [like, setLike] = useState(false);
  const post = props.post;
  return (
    <div className={styles.container}>
      <div className={styles.profile_container}>
        <img src={profile} alt="" />
        <p className={styles.main_text}>By {post.name}</p>
        <p className={styles.tittle}>{post.tittle}</p>
      </div>
      <div className={styles.text_container}>
        <p>{post.text}</p>
      </div>
      <div className={styles.commentary_and_like_container}>
        {post.likes}
        {like ? (
          <img
            src={active_like}
            onClick={() => {
              setLike(!like);
            }}
          />
        ) : (
          <img
            src={likes}
            onClick={() => {
              setLike(!like);
            }}
          />
        )}
        <img src={commentary} alt="" />
      </div>
    </div>
  );
};

export default Post;
