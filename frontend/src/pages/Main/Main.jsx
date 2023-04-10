import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useCookies } from "react-cookie";
import Header from "../../components/Header/Header";
import Feed from "../../components/Feed/Feed";

const Main = () => {
  return (
    <>
      <Header />
      <Feed />
    </>
  );
};

export default Main;
