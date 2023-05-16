import { NavLink } from "react-router-dom";
import styles from "./SecondTest.module.scss";
import SecondTestQuestions from "../../components/SecondTestQuestions/SecondTestQuestions";
import { useState } from "react";

const SecondTest = () => {
  const [it, setIt] = useState(0);
  const [gum, setGum] = useState(0);
  const question = [
    {
      id: 1,
      question: "Вас интересуют биографии ученых?",
      var1: "Да",
      var2: "Нет",
      true: "gum",
      false: "it",
      false: "gum",
    },
    {
      id: 2,
      question: "Вы с удовольствием разбираетесь в любых чертежах?",
      var1: "Да",
      var2: "Нет",
      true: "it",
      false: "gum",
    },
    {
      id: 3,
      question:
        "В поэзии вас привлекает наличие сложных метафор и изысканного языка?",
      var1: "Да",
      var2: "Нет",
      true: "gum",
      false: "it",
    },
    {
      id: 4,
      question: "Вы любите головоломки и логические задачи?",
      var1: "Да",
      var2: "Нет",
      true: "it",
      false: "gum",
    },
    {
      id: 5,
      question:
        "Вы можете быстро просчитать скидку в магазине — перевести проценты в реальные рубли?",
      var1: "Да",
      var2: "Нет",
      true: "it",
      false: "gum",
    },
    {
      id: 6,
      question:
        "Вы всегда можете описать, чем вам нравится то или иное произведение искусства?",
      var1: "Да",
      var2: "Нет",
      true: "gum",
      false: "it",
    },
    {
      id: 7,
      question:
        "Вы часто спорили(-те) с учителями по литературе, искусству, музыке?",
      var1: "Да",
      var2: "Нет",
      true: "gum",
      false: "it",
    },
    {
      id: 8,
      question:
        "Нравятся ли вам преподаватели, которые отказываются высказывать свое мнение о предмете и оперируют только голыми цифрами и фактами?",
      var1: "Да",
      var2: "Нет",
      true: "it",
      false: "gum",
    },
    {
      id: 9,
      question: "Многое ли вы можете сказать о человеке по его фотографии?",
      var1: "Да",
      var2: "Нет",
      true: "gum",
      false: "it",
    },
    {
      id: 10,
      question:
        "Доставляет ли вам удовольствие разбираться в бытовой технике и принципах ее работы?",
      var1: "Да",
      var2: "Нет",
      true: "it",
      false: "gum",
    },
    {
      id: 11,
      question:
        "Когда вы знакомитесь с человеком, вам важно знать его взгляды на искусство?",
      var1: "Да",
      var2: "Нет",
      true: "gum",
      false: "it",
    },
    {
      id: 12,
      question:
        "В журналах и газетах вам нравятся статьи с таблицами и графиками?",
      var1: "Да",
      var2: "Нет",
      true: "it",
      false: "gum",
    },
    {
      id: 13,
      question:
        "Всегда ли можно определить точную цену любого произведения искусства?",
      var1: "Да",
      var2: "Нет",
      true: "gum",
      false: "it",
    },
    {
      id: 14,
      question:
        "Вы полагаете, что собеседника проще убедить конкретными цифрами, чем эмоциями?",
      var1: "Да",
      var2: "Нет",
      true: "it",
      false: "gum",
    },
    {
      id: 15,
      question:
        "Вы согласны, что выяснить смысл жизни намного важнее, чем решить какую-нибудь математическую задачу?",
      var1: "Да",
      var2: "Нет",
      true: "gum",
      false: "it",
    },
  ];

  return (
    <div className={styles.main_container}>
      <div className={styles.goback_container}>
        <NavLink className={styles.text} to={"/test"}>
          <p>Назад</p>
        </NavLink>
      </div>
      <div className={styles.question}>
        <p>Выбирайте 1 ответ</p>
        {question.map((el, index) => (
          <SecondTestQuestions
            question={el}
            key={index}
            setGum={setGum}
            setIt={setIt}
            gum={gum}
            it={it}
            index={index}
          />
        ))}
      </div>
      <div className={styles.buttons}>
        <NavLink to={`/result?it=${it}&gum=${gum}&test=second`}>
          <button>Завершить</button>
        </NavLink>
      </div>
    </div>
  );
};

export default SecondTest;
