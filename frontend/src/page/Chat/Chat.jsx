import React, { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.scss";
import io from "socket.io-client";
import Header from "../../components/Header/Header";
import { useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
const socket = io.connect("http://localhost:5005");

const Chat = () => {
  const ref = useRef();
  const [selectDialog, setSelectDialog] = useState("");
  const [message, setMessage] = useState("");
  const [dialogs, setDialogs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();
  const getMessage = () => {
    socket.emit("join", { id: "ad" });
  };
  const inView = () => {
    ref.current.scrollIntoView(true);
  };
  const [queryParameters] = useSearchParams();
  const sendMessage = () => {
    socket.emit("sendMessage", { id: "ad", message });
  };
  if (queryParameters.get("type") === "createroom") {
    socket.emit("create-room", {
      friendId: queryParameters.get("friendId"),
      creator: cookies.name,
    });
  }
  socket.emit("my-dialogs", { myName: cookies.name });
  const setdialogData = () => {
    if (dialogs.length !== 0) {
      return dialogs.map((el) => {
        <p>{el.name}</p>;
      });
    }
  };
  useEffect(() => {
    socket.on("my-dialogs", (data) => {
      if (data.datas.lenght !== 0) {
        setDialogs(data.datas);
      }
    });
    socket.on("newRoomData", (data) => {
      console.log(data);
      if (data.datas.lenght !== 0) {
        setDialogs(data.datas);
      }
    });
    socket.on("messages", (data) => {
      setMessages(data.data);
      inView();
    });
    // socket.on("message", (data) => {
    //   setMessages(data.data);
    //   inView();
    // });
  }, [socket]);
  return (
    <>
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
            {dialogs.map(function (el) {
              return (
                <div
                  className={styles.user_container}
                  onClick={() => {
                    setSelectDialog(el.name);
                  }}
                >
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
              if (el.me === true) {
                return (
                  <div
                    key={el.id}
                    className={styles.message}
                    style={{ justifyContent: "flex-end" }}
                  >
                    <div>{el.message}</div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={el.id}
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
    </>
  );
};

export default Chat;
