import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useCookies } from "react-cookie";

const Main = () => {
  const user = useSelector((state) => state.user.user);
  const AUTH = useSelector((state) => state.user.isAuth);
  return (
    <div>
      <button
        onClick={() => {
          console.log(user);
          console.log(AUTH);
        }}
      >
        usr
      </button>
      <div>
        <button
          onClick={async () => {
            const data = await axios.get("http://localhost:8080/api/auth");
            console.log(data.data.data);
          }}
        >
          GET ALL
        </button>
      </div>
      <button
        onClick={() => {
          axios.get("http://localhost:8080/delete");
        }}
      >
        delete users
      </button>
    </div>
  );
};

export default Main;
