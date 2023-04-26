import styles from "./Feed.module.scss";
import Post from "../Post/Post.jsx";
import axios from "axios";

const Feed = ({ post }) => {
  const postFilter = () => {
    if (post.lenght != 0) {
      return post.map((el) => <Post post={el} key={el.id} />);
    } else {
      return <p>Нет постов</p>;
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.main_container} key={"123"}>
        {postFilter()}
      </div>
    </div>
  );
};

export default Feed;
