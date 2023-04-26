import Header from "../../components/Header/Header.jsx";
import styles from "./Profile.module.scss";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import UserPost from "../../components/UserPost/UserPost.jsx";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5005");

const Profile = () => {
  const picker = useRef();
  const [viewFileName, setViewFileName] = useState(false);
  const [inputTittle, setInputTittle] = useState("");
  const [cookies] = useCookies();
  const [post, setPost] = useState("");
  const [file, setFile] = useState();
  const [user, setUser] = useState({ avatar_link: "", name: "Loading" });
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
        socket.emit("create-post", {
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
  socket.emit("login", { email: cookies.email });
  socket.emit("myPost", { email: user.name });
  useEffect(() => {
    socket.on("data for login", (data) => {
      if (data.data) {
        setUser(data.data);
      }
    });
    socket.on("post", (data) => {
      if (data.data) {
        const newArray = [];
        data.data.forEach((el) => {
          newArray.unshift(el);
        });
        setMyPosts(newArray);
      }
    });
    socket.on("newPost", (data) => {
      if (data.data) {
        const newArray = [];
        data.data.forEach((el) => {
          newArray.unshift(el);
        });
        setMyPosts(newArray);
      }
    });
  }, [socket]);
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.main_container}>
          <div className={styles.header_container}>
            <div className={styles.con}>
              <img src={user.avatar_link} className={styles.image} />

              <p className={styles.text}>{user.name}</p>
            </div>
            <p>{user.description}</p>
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
    </>
  );
};

export default Profile;
