import React from "react";
import styles from "./Result.module.scss";
import { NavLink, useSearchParams } from "react-router-dom";

const Result = () => {
  const [queryParameters] = useSearchParams();
  const answer = queryParameters.get("answer");
  const test = queryParameters.get("test");
  const gum = queryParameters.get("gum");
  const it = queryParameters.get("it");
  const getResult = (answer) => {
    if (test == "second") {
      if (gum > it) {
        return <p>Похоже Вы гумманитарий</p>;
      }
      if (it > gum) {
        return <p>Похоже Вам подходят технические профессии</p>;
      } else {
        return (
          <p>
            Вам повезло! Вам подходит и технические профессии и гумманитарные
          </p>
        );
      }
    }
    if (test == "first") {
      if (answer == 7) {
        return (
          <p>
            Потрясающе. Возможно, тест не показался вам слишком сложным, но это
            лишь потому, что ваш природный талант к программированию
            безграничен. Но раз уж вы взялись за его выполнение, значит есть
            сомнения.
          </p>
        );
      }
      if (answer > 5 && answer != 7) {
        return (
          <p>
            Скорее всего вы один раз просто не поняли вопроса, ничего страшного.
            Мы то знаем, что вы талантливый программист от Бога, а тест
            составлял просто никчёмный «нуб».
          </p>
        );
      }
      if (answer < 5 && answer >= 3) {
        return (
          <p>
            Неплохо. В вас определённо есть задатки программиста, однако
            придётся приложить немало усилий чтобы добиться успеха в профессии.
          </p>
        );
      }
      if (answer < 3) {
        return (
          <p>
            Вы или специально выбирали неправильные варианты ответов или вам ещё
            очень далеко до осознания того, чем занимаются программисты. Не
            спешите рассматривать зарплаты в IT-сфере, вам ещё предстоит много
            обучиться.
          </p>
        );
      }
    }
  };
  return (
    <div
      className={styles.main}
      onClick={() => {
        console.log(answer);
      }}
    >
      <div className={styles.show_answer}>
        <div className={styles.getresult}> {getResult(answer)}</div>
        <div className={styles.button_result}>
          {test == "first" ? (
            <>
              <NavLink to="/test/1">
                <button>Пройти тест заново</button>
              </NavLink>
              <NavLink to="/test">
                <button>Вернуться</button>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/test/2">
                <button>Пройти тест заново</button>
              </NavLink>
              <NavLink to="/test">
                <button>Вернуться</button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
