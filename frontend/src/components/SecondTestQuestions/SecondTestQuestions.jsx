import { useState } from "react";
import styles from "./SecondTestQuestions.module.scss";

export const SecondTestQuestions = ({
  question,
  setIt,
  setGum,
  gum,
  it,
  index,
}) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGum, setIsGum] = useState(false);
  const [isIt, setIsIt] = useState(false);
  const setAnswer = (e) => {
    if (isAnswered == true) {
      if (e.target.value == "Да") {
        if (question.true == "gum") {
          setGum(gum + 1);
          setIsGum(true);
          setIt(it - 1);
          setIsIt(false);
        } else {
          setIt(it + 1);
          setIsIt(true);
          setGum(gum - 1);
          setIsGum(false);
        }
      }
      if (e.target.value == "Нет") {
        if (question.true == "gum") {
          setIt(it + 1);
          setIsIt(true);
        } else {
          setGum(gum + 1);
          setIsGum(true);
        }
      }
    }
    if (isAnswered == false) {
      setIsAnswered(true);
      if (e.target.value == "Да") {
        if (question.true == "gum") {
          setGum(gum + 1);
          setIsGum(true);
        } else {
          setIt(it + 1);
          setIsIt(true);
        }
      }
      if (e.target.value == "Нет") {
        if (question.true == "gum") {
          setIt(it + 1);
          setIsIt(true);
        } else {
          setGum(gum + 1);
          setIsGum(true);
        }
      }
    }
  };
  return (
    <div className={styles.question}>
      <p>{question.question}</p>
      <div className={styles.variants}>
        <input
          name={question.var1}
          type="checkbox"
          id={question.id}
          value={question.var1}
          onClick={(e) => setAnswer(e)}
        />
        <label htmlFor={question.var1}>{question.var1}</label>
      </div>
      <div className={styles.variants}>
        <input
          name={question.var1}
          type="checkbox"
          id={question.id}
          value={question.var2}
          onClick={(e) => setAnswer(e)}
        />
        <label htmlFor={question.var2}>{question.var2}</label>
      </div>
    </div>
  );
};

export default SecondTestQuestions;
