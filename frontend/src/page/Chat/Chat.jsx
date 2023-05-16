import { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.scss";
import io from "socket.io-client";
import Header from "../../components/Header/Header";
import { useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
const socket = io.connect("http://localhost:5001");
import axios from "axios";

const Chat = () => {
  const ref = useRef();
  const myData = useSelector((state) => state.user.user);
  const [selectDialog, setSelectDialog] = useState("");
  const [message, setMessage] = useState("");
  const [dialogs, setDialogs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [cookies] = useCookies();
  const [roomId, setRoomId] = useState("");
  const inView = () => {
    ref.current.scrollIntoView(true);
  };

  const [queryParameters] = useSearchParams();
  const sendMessage = () => {
    socket.emit("sendMessage", { id: roomId, message, author: cookies.name });
  };
  let counter = 0;
  if (queryParameters.get("type") === "createroom") {
    if (counter == 0) {
      counter = 1;
      socket.emit("create-room", {
        friendName: queryParameters.get("friendName"),
        creator: cookies.name,
        avatar_link: queryParameters.get("avatar"),
        my_avatar: myData.avatar_link,
      });
    }
  }
  const getMessagesData = (el) => {
    axios
      .post(`http://localhost:5001/messages?roomId=${el.room_id}`)
      .then((data) => {
        console.log(data);
        setMessages(data.data);
      });
    setSelectDialog(el.name);
    setRoomId(el.room_id);
    inView();
    inView();
    inView();
  };
  socket.emit("my-dialogs", { myName: cookies.name });
  useEffect(() => {
    socket.on("my-dialogs", (data) => {
      if (data.datas.lenght !== 0) {
        setDialogs(data.datas);
      }
    });
    socket.on("newRoomData", (data) => {
      if (data.lenght !== 0) {
        setDialogs(data);
      }
    });
    socket.on("newData", (data) => {
      // setMessages((state) => [...state, data]);
      console.log(data);
      if (data.id == roomId) {
        setMessages((el) => [
          ...el,
          {
            author: data.author,
            message: data.message,
          },
        ]);
        inView();
      }
    });
  }, [socket]);
  return (
    <div style={{ display: "flex" }}>
      <Header />
      <div className={styles.container}>
        <div className={styles.users_container}>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <p
              onClick={() => {
                if (queryParameters.get("type") === "createroom") {
                  console.log(queryParameters.get("friendId"));
                }
              }}
            >
              Пользователи
            </p>
          </div>
          <div className={styles.user}>
            {dialogs.map(function (el, index) {
              return (
                <div
                  key={index}
                  className={styles.user_container}
                  onClick={() => {
                    getMessagesData(el);
                  }}
                >
                  <img src={el.avatar_link} alt="" />
                  <p>{el.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.message_container}>
          <div className={styles.name_message}>
            <p className={styles.name}>{selectDialog}</p>
          </div>
          <div className={styles.messages}>
            {messages.map(function (el, index) {
              if (el.author == cookies.name) {
                return (
                  <div
                    key={index}
                    className={styles.message}
                    style={{ justifyContent: "flex-end" }}
                  >
                    <div>{el.message}</div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className={styles.message}
                    style={{ justifyContent: "flex-start" }}
                  >
                    <div>{el.message}</div>
                  </div>
                );
              }
            })}
            <div className={styles.fake_con} ref={ref} />
          </div>
          <div className={styles.input_container}>
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button
              onClick={() => {
                setMessage("");
                sendMessage();
              }}
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
