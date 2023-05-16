import React from "react";
import styles from "./Test.module.scss";
import firstTestImg from "../../image/image_to_test_1.png";
import { NavLink } from "react-router-dom";
import Header from "../../components/Header/Header";

const Test = () => {
  const tests = [
    {
      id: 1,
      name: "Смогу ли я стать программистом?",
      img: firstTestImg,
      url: "/test/1",
    },
    {
      id: 2,
      name: "Гумманитарий я или технарь?",
      img: "https://testograd.com/upload/aelita.test/4c6/412aa92m58kfpvs10rxpdcbapernsx1e.jpg",
      url: "/test/2",
    },
  ];
  return (
    <div style={{ display: "flex" }}>
      <Header />
      <div className={styles.main_container}>
        <div className={styles.container}>
          <p className={styles.text}>Наши доступные тесты:</p>
          <div className={styles.tests_container}>
            {tests.map((el) => (
              <NavLink
                key={el.id}
                to={el.url}
                style={{ color: "black", textDecoration: "none" }}
              >
                <div className={styles.test}>
                  <img src={el.img} alt="" />
                  <p>{el.name}</p>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
