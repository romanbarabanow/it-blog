import Header from "../../components/Header/Header.jsx";
import styles from "./Profile.module.scss";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import UserPost from "../../components/UserPost/UserPost.jsx";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const socketPost = io.connect("http://localhost:5003");
const socketLogin = io.connect("http://localhost:5002");

const Profile = () => {
  const picker = useRef();
  const [viewFileName, setViewFileName] = useState(false);
  const [inputTittle, setInputTittle] = useState("");
  const [cookies] = useCookies();
  const [post, setPost] = useState("");
  const [file, setFile] = useState();
  const user = useSelector((state) => state.user.user);
  const [myPosts, setMyPosts] = useState([]);
  const uploadImg = () => {
    const formData = new FormData();
    formData.append("file", file[0]);
    axios
      .post(
        `http://localhost:5000/img?name=${user.name}&tittle=${inputTittle}&text=${post}`,
        formData
      )
      .then((response) => {
        socketPost.emit("create-post", {
          text: post,
          tittle: inputTittle,
          img_link: response.data.urlfile,
          name: user.name,
        });
      });

    setFile(null);
    setViewFileName(false);
    setInputTittle("");
    setPost("");
  };
  socketPost.emit("myPost", { email: user.name });
  useEffect(() => {
    socketPost.on("post", (data) => {
      if (data.data) {
        const newArray = [];
        data.data.forEach((el) => {
          newArray.unshift(el);
        });
        setMyPosts(newArray);
      }
    });
    socketPost.on("newPost", (data) => {
      if (data.data) {
        const newArray = [];
        data.data.forEach((el) => {
          newArray.unshift(el);
        });
        setMyPosts(newArray);
      }
    });
  }, [socketPost, socketLogin]);
  return (
    <div style={{ display: "flex" }}>
      <Header />
      <div className={styles.container}>
        <div className={styles.main_container}>
          <div className={styles.header_container}>
            <div className={styles.con}>
              <img src={user.avatar_link} className={styles.image} />

              <p className={styles.text}>{user.name}</p>
            </div>
            <div className={styles.description_container}>
              <p style={{ marginLeft: "10px" }}>{user.description}</p>
            </div>
          </div>
          <div className={styles.edit_container}>
            <NavLink to={"/profile-settings"}>
              <button>Редактировать профиль</button>
            </NavLink>
          </div>
          <div className={styles.write_post}>
            <div style={{ width: "70%" }}>
              <input
                value={inputTittle}
                onChange={(e) => {
                  setInputTittle(e.target.value);
                }}
                className={styles.inputTittle}
                placeholder="Введите название статьи..."
              />
              <textarea
                className={styles.input_post}
                placeholder={"Напишите статью..."}
                value={post}
                onChange={(e) => {
                  setPost(e.target.value);
                }}
              />
            </div>
            <div style={{ width: "30%" }} className={styles.buttons}>
              <button
                className={styles.button_file}
                onClick={() => {
                  picker.current.click();
                  setViewFileName(true);
                }}
              >
                {viewFileName ? "Выбрать другую картинку" : "Выбрать картинку"}
              </button>
              <input
                ref={picker}
                type="file"
                className={styles.file}
                onChange={(e) => {
                  {
                    setFile(e.target.files);
                  }
                }}
              />
              <div className={styles.send_button}>
                <button
                  onClick={() => {
                    uploadImg();
                  }}
                >
                  Опубликовать
                </button>
              </div>
            </div>
          </div>
          <UserPost post={myPosts} setMyPosts={setMyPosts} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
