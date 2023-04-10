import axios from "axios";
import { setPosts } from "../store/PostReducer";

export const getAllPosts = (token) => {
  return async (dispatch) => {
    const posts = await axios.get(
      `http://localhost:8080/api/post?token=${token}`
    );
    dispatch(setPosts(posts.data));
  };
};
