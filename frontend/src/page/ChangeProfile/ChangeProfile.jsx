import React, { useEffect, useRef, useState } from "react";
import styles from "./ChangeProfile.module.scss";
import Header from "../../components/Header/Header";
import io from "socket.io-client";
import { useCookies } from "react-cookie";
import axios from "axios";
const socket = io.connect("http://localhost:5002");

const ChangeProfile = () => {
  const ref = useRef();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [avatarslink, setAvatarslink] = useState("");
  const [file, setFile] = useState();
  const [photoIs, setPhotoIs] = useState(false);
  socket.emit("login", { email: cookies.email });
  const saveButton = () => {
    const formData = new FormData();
    formData.append("file", file[0]);
    axios
      .post(`http://localhost:5000/img?name=${cookies.name}`, formData)
      .then((response) => {
        socket.emit("changeUser", {
          avatar_link: response.data.urlfile,
          description,
          password,
          email: cookies.email,
        });
      });
  };
  let counter = 0;
  useEffect(() => {
    console.log("effect");
    socket.on("changeUsersData", (data) => {
      console.log(data);
      counter = 0;
      if (data.data) {
        if (counter === 0) {
          counter = 1;
          setDescription(data.data.description);
          setPassword(data.data.password);
          setAvatarslink(data.data.avatar_link);
        }
      }
    });
    socket.on("data for login", (data) => {
      if (data.data) {
        if (counter === 0) {
          counter = 1;
          setDescription(data.data.description);
          setPassword(data.data.password);
          setAvatarslink(data.data.avatar_link);
        }
      }
    });
  }, [socket]);
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.you_profile}>
          <p
            onClick={() => {
              console.log(file[0]);
            }}
          >
            Ваш Профиль
          </p>
        </div>
        <div className={styles.main_container}>
          <div className={styles.top_container}>
            <div className={styles.photo_container}>
              <img src={avatarslink} />
              <button
                onClick={() => {
                  ref.current.click();
                }}
              >
                {photoIs ? "Другое фото" : "Новое фото"}
              </button>
              <input
                type="file"
                ref={ref}
                onChange={(e) => {
                  {
                    setFile(e.target.files);
                    setPhotoIs(true);
                  }
                }}
              />
            </div>
            <div className={styles.inputs_container}>
              <div className={styles.text_area}>
                <p>Описание вашего профиля:</p>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className={styles.input_con}>
                <p>Новый пароль</p>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <button className={styles.button} onClick={saveButton}>
            Сохранить
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangeProfile;
