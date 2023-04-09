import React, { useEffect } from "react";
import styles from "./Feed.module.scss";
import { getAllPosts } from "../../action/posts";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import Post from "../Post/Post";

const Feed = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const [cookie] = useCookies();
  useEffect(() => {
    dispatch(getAllPosts(cookie.token));
  }, [dispatch]);
  return (
    <div className={styles.main_container}>
      <div className={styles.post_container}>
        {posts.map((el) => (
          <Post post={el} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
