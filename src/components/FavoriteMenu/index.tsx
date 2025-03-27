"use client";
import React, { useEffect, useState, useContext } from "react";
import { IngredientsContext } from "@/context/IngredientsContext";
import styles from "./styles.module.scss";
import { getHistory1 } from "@/services/getDataMenu1";
import { getHistory2 } from "@/services/getDataMenu2";
import { getHistory3 } from "@/services/getDataMenu3";
import { getHistory4 } from "@/services/getDataMenu4";
import {
  getDinnerData,
  getBreakfastData,
  getLunchData,
  getSalad,
  getPastriesDesserts,
} from "@/services/getData";

export default function FavoriteMenu() {
  const { userChoice, setUserChoice } = useContext(IngredientsContext);
  const [value, setValue] = useState<any[]>([]);
  let value2: any = [];
  const DinnerData = getDinnerData();
  const BreakfastData = getBreakfastData();
  const LunchData = getLunchData();
  const SaladData = getSalad();
  const PastriesDesserts = getPastriesDesserts();
  const setOfDishes1 = getHistory1();
  const setOfDishes2 = getHistory2();
  const setOfDishes3 = getHistory3();
  const setOfDishes4 = getHistory4();

  const deleteMenu = () => {
    for (let i = 1; i <= 7; i++) {
      const key = `day${i}_feature`;
      if (key in userChoice) {
        delete (userChoice as any)[key];
      }
    }
    setUserChoice({ ...userChoice });
  };

  const loadMenu = (history: any, nameDay: string) => {
    setUserChoice((prevUserChoice) => ({
      ...prevUserChoice,
      [nameDay]: {
        ...history,
      },
    }));
  };
  //извлекает данные для ключа ингридиенты
  const extractIngredients = (dataDish: any) => {
    if (dataDish) {
      const updatedValue = Object.entries(dataDish.value);
      //setValue(updatedValue); // Set the value state with updatedValue
      value2 = updatedValue;
    }
    //console.log("dataString", value);
  };
  //находит данные блюд дня и создает объект
  const foundDishMenu = (arrNamesDish: [], nameDay: string) => {
    let menuOneDay = {};
    for (let i = 0; i < arrNamesDish.length; i++) {
      const dishToFind = arrNamesDish[i];
      const foundDinner = DinnerData.find((item) => item.label === dishToFind);
      extractIngredients(foundDinner);
      const foundBreakfast: any = BreakfastData.find(
        (item) => item.label === dishToFind
      );
      extractIngredients(foundBreakfast);
      const foundLunch = LunchData.find((item) => item.label === dishToFind);
      extractIngredients(foundLunch);
      const foundSalad = SaladData.find((item) => item.label === dishToFind);
      extractIngredients(foundSalad);
      const foundPastries: any = PastriesDesserts.find(
        (item) => item.label === dishToFind
      );
      extractIngredients(foundPastries);

      menuOneDay = {
        ...menuOneDay,
        [dishToFind]: {
          ...foundDinner,
          ...foundBreakfast,
          ...foundLunch,
          ...foundSalad,
          ...foundPastries,
          numberServings: 1,
          ingredients: value2,
        },
      };
    }
    //console.log("menuOneDay", menuOneDay);
    loadMenu(menuOneDay, nameDay);
  };
  //отдает функции массив с блюдами дня
  const menuDay = (nameDish: any) => {
    console.log("dataString", nameDish);
    deleteMenu();
    //for (let r = 0; r < nameDish.length; r++) {
    for (let r = nameDish.length - 1; r >= 0; r--) {
      let nameDay = `day${r + 1}_feature`;
      foundDishMenu(nameDish[r], nameDay);
    }
    window.location.href = "/";
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
      <div className={backgroundClassState}>
        <div className={`${styles.wrapper} ${styles.noWorck2Styles}`}>
          <h2 className={styles.h2Title}>
            Вкусное и недорогое меню для семьи на месяц
          </h2>
          <div className={styles.container}>
            <div className={styles.section}>
              <h2>меню для первой недели</h2>
              <button
                className={styles.button}
                onClick={() => menuDay(setOfDishes1)}
              >
                <div className={styles.front}>
                  <div className={styles.container_img}>
                    <div className={styles.image}>
                      <img
                        src={
                          "https://bartcevich.github.io/letter/image_favorit/11%201.png"
                        }
                        alt="Image"
                      />
                    </div>
                    <div className={styles.image}>
                      <img
                        src={
                          "https://bartcevich.github.io/letter/image_favorit/12%201.png"
                        }
                        alt="Image"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.back}>
                  <div className={styles.content}>
                    <div className={styles.main}>
                      <h4 className={styles.text_center}>
                        Здесь будет описание карточки
                      </h4>
                      <p>Inna was working with our team since 2012.</p>
                      <p>Web design</p>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <div className={styles.section}>
              <h2>меню для второй недели</h2>
              <button
                className={styles.button}
                onClick={() => menuDay(setOfDishes2)}
              >
                <div className={styles.front}>
                  <div className={styles.container_img}>
                    <div className={styles.image}>
                      <img
                        src={
                          "https://bartcevich.github.io/letter/image_favorit/21%201.png"
                        }
                        alt="Image"
                      />
                    </div>
                    <div className={styles.image}>
                      <img
                        src={
                          "https://bartcevich.github.io/letter/image_favorit/22%201.png"
                        }
                        alt="Image"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.back}>
                  <div className={styles.content}>
                    <div className={styles.main}>
                      <h4 className={styles.text_center}>
                        Здесь будет описание карточки
                      </h4>
                      <p>Inna was working with our team since 2012.</p>
                      <p>Web design</p>
                    </div>
                  </div>
                </div>
              </button>
            </div>
            <div className={styles.section}>
              <h2>меню для третьей недели</h2>
              <button
                className={styles.button}
                onClick={() => menuDay(setOfDishes3)}
              >
                <div className={styles.front}>
                  <div className={styles.container_img}>
                    <div className={styles.image}>
                      <img
                        src={
                          "https://bartcevich.github.io/letter/image_favorit/31%201.png"
                        }
                        alt="Image"
                      />
                    </div>
                    <div className={styles.image}>
                      <img
                        src={
                          "https://bartcevich.github.io/letter/image_favorit/32%201.png"
                        }
                        alt="Image"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.back}>
                  <div className={styles.content}>
                    <div className={styles.main}>
                      <h4 className={styles.text_center}>
                        Здесь будет описание карточки
                      </h4>
                      <p>Inna was working with our team since 2012.</p>
                      <p>Web design</p>
                    </div>
                  </div>
                </div>
              </button>
            </div>
            <div className={styles.section}>
              <h2>меню для четвертой недели</h2>
              <button
                className={styles.button}
                onClick={() => menuDay(setOfDishes4)}
              >
                <div className={styles.front}>
                  <div className={styles.container_img}>
                    <div className={styles.image}>
                      <img
                        src={
                          "https://bartcevich.github.io/letter/image_favorit/41%201.png"
                        }
                        alt="Image"
                      />
                    </div>
                    <div className={styles.image}>
                      <img
                        src={
                          "https://bartcevich.github.io/letter/image_favorit/42%201.png"
                        }
                        alt="Image"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.back}>
                  <div className={styles.content}>
                    <div className={styles.main}>
                      <h4 className={styles.text_center}>
                        Здесь будет описание карточки
                      </h4>
                      <p>Inna was working with our team since 2012.</p>
                      <p>Web design</p>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
