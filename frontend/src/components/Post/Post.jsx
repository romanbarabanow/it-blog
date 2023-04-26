import styles from "./Post.module.scss";

const Post = (props) => {
  const post = props.post;
  if (post.tittle === "Хуйня") {
    return <div></div>;
  }
  return (
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
    </div>
  );
};

export default Post;
