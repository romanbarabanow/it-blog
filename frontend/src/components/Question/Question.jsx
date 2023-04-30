import React, { useState } from "react";
import styles from "./Question.module.scss";
import { Route } from "react-router";
import { NavLink } from "react-router-dom";

const Question = ({ question, setAnswer, answer }) => {
  const [answeres, setAnswered] = useState(false);
  const [trueAnswer, setTrueAnswer] = useState(false);
  return (
    <div className={styles.question}>
      <p>{question.question}</p>
      <div className={styles.variants}>
        <input
          name={question.var1}
          type="radio"
          id={question.var1}
          value={question.value1}
          onClick={(e) => {
            if (answeres === true) {
              if (trueAnswer === true) {
                if (e.target.value === "no") {
                  setAnswer(answer - 1);
                  setTrueAnswer(false);
                }
              }
              if (trueAnswer === false) {
                if (e.target.value === "yes") {
                  setTrueAnswer(true);
                  setAnswer(answer + 1);
                }
              }
            } else {
              if (e.target.value === "yes") {
                setAnswered(true);
                setAnswer(answer + 1);
                setTrueAnswer(true);
              } else {
                setAnswered(true);
              }
            }
          }}
        />
        <label htmlFor={question.var1}>{question.var1}</label>
      </div>
      <div className={styles.variants}>
        <input
          onClick={(e) => {
            if (answeres === true) {
              if (trueAnswer === true) {
                if (e.target.value === "no") {
                  setAnswer(answer - 1);
                  setTrueAnswer(false);
                }
              }
              if (trueAnswer === false) {
                if (e.target.value === "yes") {
                  setTrueAnswer(true);
                  setAnswer(answer + 1);
                }
              }
            } else {
              if (e.target.value === "yes") {
                setAnswered(true);
                setAnswer(answer + 1);
                setTrueAnswer(true);
              } else {
                setAnswered(true);
              }
            }
          }}
          name={question.var1}
          type="radio"
          id={question.var2}
          value={question.value2}
        />
        <label htmlFor={question.var2}>{question.var2}</label>
      </div>
      <div className={styles.variants}>
        <input
          name={question.var1}
          type="radio"
          id={question.var3}
          value={question.value3}
          onClick={(e) => {
            if (answeres === true) {
              if (trueAnswer === true) {
                if (e.target.value === "no") {
                  setAnswer(answer - 1);
                  setTrueAnswer(false);
                }
              }
              if (trueAnswer === false) {
                if (e.target.value === "yes") {
                  setTrueAnswer(true);
                  setAnswer(answer + 1);
                }
              }
            } else {
              if (e.target.value === "yes") {
                setAnswered(true);
                setAnswer(answer + 1);
                setTrueAnswer(true);
              } else {
                setAnswered(true);
              }
            }
          }}
        />
        <label htmlFor={question.var3}>{question.var3}</label>
      </div>
    </div>
  );
};

export default Question;
