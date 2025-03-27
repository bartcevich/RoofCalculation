"use client";
import React, { useEffect, useState, useContext } from "react";
import { IngredientsContext } from "@/context/IngredientsContext";
import styles from "./styles.module.scss";

interface MondayProps {
  day: string;
}

const ShowMenuDay: React.FC<MondayProps> = (props) => {
  const { userChoice, setUserChoice } = useContext(IngredientsContext);
  const [menuData, setMenuData] = useState<any[]>([]);
  //1 отделение от ключа сохраненного выбора пользователя
  let userChoiceForComponent: any = {};
  const dataForComponent = () => {
    const stateFirstUndefined: any = userChoice;
    userChoiceForComponent = stateFirstUndefined[`${props.day}_feature`] || {};
    const values = Object.values(userChoiceForComponent);
    const lastFiveObjects = values.slice(-5);
    setMenuData(lastFiveObjects);
  };
  useEffect(() => {
    if (
      typeof userChoice === "object" &&
      userChoice !== null &&
      Object.keys(userChoice).length > 0
    ) {
      dataForComponent();
    }
  }, [userChoice, props.day]);
  //добавляет запрашиваемые ингридиенты
  const toggleIngredients = (index: number) => {
    const updatedMenuData = menuData.map((item, i) => {
      if (i === index) {
        return { ...item, showIngredients: !item.showIngredients };
      }
      return item;
    });
    setMenuData(updatedMenuData);
  };
  //5 добавление ключа от этого компонента и сохранение
  const savingToContext = () => {
    setUserChoice((prevUserChoice) => ({
      ...prevUserChoice,
      [`${props.day}_feature`]: {
        ...userChoiceForComponent,
      },
    }));
  };
  // delete from show
  const deleteMenuItem = (label: string) => {
    dataForComponent();
    const labelDelete = label;
    delete userChoiceForComponent[labelDelete];
    savingToContext();
    //console.log("label2", labelDelete);
  };
  //close the ingredient show when opening a new show ingredient
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  // вызов сохранения обновленного блюда
  const challengeSaving = (
    menuItem: any,
    newIngredients: any,
    newNumber: any
  ) => {
    const selectedUser = {
      [menuItem.label]: {
        label: menuItem.label,
        numberServings: newNumber,
        ingredients: newIngredients,
        image: menuItem.image,
      },
    };
    dataForComponent();
    userChoiceForComponent = {
      ...userChoiceForComponent,
      ...selectedUser,
    };
    savingToContext();
    //console.log(props.day, menuItem);
  };
  // уменьшение количества ингредиентов
  const countMinus = (menuItem: any) => {
    const number = menuItem.numberServings;
    const ingredients = menuItem.ingredients;
    const startIngredients = ingredients.map(([key, val]: [string, number]) => [
      key,
      val / number,
    ]);
    const newIngredients = startIngredients.map(
      ([key, val]: [string, number]) => [key, val * (number - 1)]
    );
    const newNumber = number < 2 ? 1 : number - 1;
    challengeSaving(menuItem, newIngredients, newNumber);
  };
  const countPlus = (menuItem: any) => {
    const number = menuItem.numberServings;
    const ingredients = menuItem.ingredients;
    const startIngredients = ingredients.map(([key, val]: [string, number]) => [
      key,
      val / number,
    ]);
    const newIngredients = startIngredients.map(
      ([key, val]: [string, number]) => [key, val * (number + 1)]
    );
    const newNumber = number > 99 ? 100 : number + 1;
    challengeSaving(menuItem, newIngredients, newNumber);
  };

  return (
    <>
      {menuData.map((menuItem, index) => (
        <div key={index} className={styles.menuItem}>
          <div className={styles.container}>
            <div className={styles.image}>
              <img
                src={menuItem.image}
                alt="Image"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div>
              <div className={styles.label}>
                <span className={styles.nameDish}>{menuItem.label}</span>
                <span> Для </span>
                <span className={styles.numberServings}>
                  <button onClick={() => countMinus(menuItem)}>-</button>
                  <span> </span>
                  {menuItem.numberServings}
                  <span> </span>
                  <button onClick={() => countPlus(menuItem)}>+</button>
                </span>
                {menuItem.numberServings === 1 ? `человека.` : `человек.`}
                <div className={styles.container_button}>
                  {activeIndex === index && (
                    <div className={styles.button}>
                      <button onClick={() => toggleIngredients(index)}>
                        {menuItem.showIngredients
                          ? "Cвернуть.  "
                          : "Смотреть состав.  "}
                      </button>
                      <button onClick={() => deleteMenuItem(menuItem.label)}>
                        Удалить.
                      </button>
                    </div>
                  )}
                  <div
                    className={styles.dropdownIcon}
                    onClick={() => handleToggle(index)}
                  >
                    &#8942;
                  </div>
                </div>

                {activeIndex === index && menuItem.showIngredients && (
                  <div className={styles.ingredientCourse}>
                    <ul>
                      {menuItem.ingredients.map(
                        (ingredient: string, i: number) => (
                          <li key={i}>{ingredient}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShowMenuDay;
