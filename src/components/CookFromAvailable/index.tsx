"use client";
import React, { useEffect, useState, useContext } from "react";
import { IngredientsContext } from "@/context/IngredientsContext";
import styles from "./styles.module.scss";
import Image from "next/image";
import person_thinks from "@/assets/images/person_thinks.png";
import {
  getDinnerData,
  getBreakfastData,
  getLunchData,
  getSalad,
  getPastriesDesserts,
} from "@/services/getData";

export default function CookFromAvailable() {
  const { userChoice, setUserChoice } = useContext(IngredientsContext);
  const DinnerData = getDinnerData();
  const BreakfastData = getBreakfastData();
  const LunchData = getLunchData();
  const SaladData = getSalad();
  const PastriesDesserts = getPastriesDesserts();
  const [answer, setAnswer] = useState("");
  const [allFound, setAllFound] = useState<any[]>([]);

  useEffect(() => {
    const foundDinner = DinnerData.filter((item) =>
      item.value.hasOwnProperty(answer)
    );
    const foundBreakfast = BreakfastData.filter((item) =>
      item.value.hasOwnProperty(answer)
    );
    const foundLunch = LunchData.filter((item) =>
      item.value.hasOwnProperty(answer)
    );
    const foundSalad = SaladData.filter((item) =>
      item.value.hasOwnProperty(answer)
    );
    const foundPastries = PastriesDesserts.filter((item) =>
      item.value.hasOwnProperty(answer)
    );
    const allFoundItems = [
      ...foundDinner,
      ...foundBreakfast,
      ...foundLunch,
      ...foundSalad,
      ...foundPastries,
    ];
    setAllFound(allFoundItems);
    //console.log(foundSalad);
    // const labelsDinner = foundDinner.map((item) => item.label);
    // const labelsPastries = foundPastries.map((item) => item.label);
    // setDataString(
    //   `Из "${answer}" можно приготовить:
    //     ${labelsDinner.join(", ")}
    //     ${labelsPastries.join(", ")}`
    // );
  }, [answer]);

  const handleAnswerChange = (e: any) => {
    const enteredAnswer = e.target.value;
    setAnswer(enteredAnswer);
  };

  const [backgroundClassState, setBackgroundClassState] = useState("");
  const dataForComponent = () => {
    const stateFirstUndefined: any = userChoice;
    const numberGet = stateFirstUndefined.background || 1;
    setBackgroundClassState(`${styles[`background${numberGet}`]}`);
  };
  //задание однократного вызова из памяти номера фона
  useEffect(() => {
    if (
      typeof userChoice === "object" &&
      userChoice !== null &&
      Object.keys(userChoice).length > 0
    ) {
      dataForComponent();
    }
  }, [userChoice]);

  return (
    <>
      <div className={`${styles.center} ${backgroundClassState}`}>
        <div className={styles.wrapper}>
          {/* <h2>Выберите ингридиент для приготовления</h2> */}
          <div className={styles.background}>
            <Image
              className={styles.background_image}
              src={person_thinks}
              alt="image"
            />
            <div className={styles.container_background}>
              <select
                className={styles.form}
                onChange={handleAnswerChange}
                value={answer}
                id="contactAnswer"
                name="answer"
              >
                <option value="Выберите ингридиент">Выберите ингридиент</option>
                <optgroup label="Категории блюд">
                  <option value="завтрак">Завтраки</option>
                </optgroup>
                <optgroup label="Oвощи">
                  <option value="Помидоры гр">Помидоры</option>
                  <option value="Консервированный горошек гр">
                    Консервированный горошек
                  </option>
                  <option value="potato" disabled>
                    Potato
                  </option>
                </optgroup>
                <optgroup label="Pыба">
                  <option value="Крабовые палочки гр">Крабовые палочки</option>
                  <option value="Рыба гр">Рыба</option>
                  <option value="Селедка соленая гр">Селедка соленая</option>
                </optgroup>
                <optgroup label="Полуфабрикаты">
                  <option value="Сосиски гр">Сосиски</option>
                  <option value="Ветчина гр">Ветчина</option>
                  <option value="Пельмени гр">Пельмени</option>
                  <option value="Яйца куриные шт">Яйца куриные</option>
                </optgroup>
                <optgroup label="Mясо">
                  <option value="Грудинка гр">Грудинка</option>
                  <option value="Курица гр">Курица</option>
                  <option value="Куриные крылья гр">Куриные крылья</option>
                  <option value="Куриное филе гр">Куриное филе</option>
                  <option value="Свинина гр">Свинина</option>
                  <option value="Свиной фарш гр">Свиной фарш</option>
                  <option value="Свиные ребра гр">Свиные ребра</option>
                  <option value="Сало гр">Сало</option>
                  <option value="Говядина гр">Говядина</option>
                </optgroup>
              </select>
              <div className={styles.container_scroll}>
                {allFound.length > 0 && <h2>Вы можете приготовить: </h2>}
                {allFound.map((menuItem, index) => (
                  <div key={index} className={styles.menuItem}>
                    <div className={styles.container}>
                      <div className={styles.labelImage}>
                        <div className={styles.label}>{menuItem.label}</div>
                        <div className={styles.image}>
                          <img src={menuItem.image} alt="Image" />
                          {/* befor Image afto  image */}
                        </div>
                      </div>
                      <div>
                        {Object.entries(menuItem.value).map(
                          ([name, quantity]) => (
                            <span
                              className={styles.ingredientCourse}
                              key={name}
                            >
                              {name}:{quantity as number},<span> </span>
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
