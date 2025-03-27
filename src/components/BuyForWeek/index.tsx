"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./styles.module.scss";
import { IngredientsContext } from "@/context/IngredientsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";

export default function BuyForWeek() {
  const { userChoice, setUserChoice } = useContext(IngredientsContext);
  const [sumIngredientsPrint, setSumIngredientsPrint] = useState({});
  const [menuPrint, setMenuPrint] = useState<any[]>([]);

  const dataForComponent = () => {
    const stateFirstUndefined: any = userChoice;
    const userChoiceForComponent = {
      ...(stateFirstUndefined["day1_feature"] || {}),
      ...(stateFirstUndefined["day2_feature"] || {}),
      ...(stateFirstUndefined["day3_feature"] || {}),
      ...(stateFirstUndefined["day4_feature"] || {}),
      ...(stateFirstUndefined["day5_feature"] || {}),
      ...(stateFirstUndefined["day6_feature"] || {}),
      ...(stateFirstUndefined["day7_feature"] || {}),
    };
    setMenuPrint(Object.keys(userChoiceForComponent));
    console.log("all day", Object.keys(userChoiceForComponent));
    const oneArrIngredients = Object.values(userChoiceForComponent)
      .map((item: any) => item.ingredients)
      .flat();

    setSumIngredientsPrint(
      oneArrIngredients.reduce((accumulator, current) => {
        const [ingredient, weight] = current;
        if (accumulator.hasOwnProperty(ingredient)) {
          accumulator[ingredient] += weight;
        } else {
          accumulator[ingredient] = weight;
        }
        return accumulator;
      }, {})
    );
  };
  //запуск компонента при измененниях данных в памяти
  useEffect(() => {
    if (
      typeof userChoice === "object" &&
      userChoice !== null &&
      Object.keys(userChoice).length > 0
    ) {
      dataForComponent();
    }
  }, [userChoice]);
  //копирование в буфер ingredients и подтверждение этого на экране
  const [showTooltip, setShowTooltip] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleCopy = () => {
    if (textareaRef.current) {
      const formattedString = Object.entries(sumIngredientsPrint)
        .map(([ingredient, weight]) => `${ingredient}: ${weight}`)
        .join(",\n");
      textareaRef.current.value = formattedString;
      textareaRef.current.select();
      document.execCommand("copy");
      setShowTooltip(true);
      setShowCheck(true);
      setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }
  };
  //копирование в буфер menu и подтверждение этого на экране
  const [showCheckMenu, setShowCheckMenu] = useState(false);
  const handleCopyMenu = () => {
    const textToCopy = menuPrint.join("\n");
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setShowTooltip(true);
        setShowCheckMenu(true);
        setTimeout(() => {
          setShowTooltip(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Ошибка копирования: ", error);
      });
  };
  //включение показа списка покупок
  const [sumIngredients, setSumIngredients] = useState(false);
  const handleIngredients = () => {
    setSumIngredients((prevValue) => !prevValue);
  };

  return (
    <>
      <div className={styles.container}>
        <details className={styles.details}>
          <summary>Выбранные блюда</summary>
          <button
            aria-label="копировать список"
            className={styles.handleCopy}
            onClick={handleCopyMenu}
          >
            <FontAwesomeIcon icon={faCopy} />
            <span> </span>
            {showCheckMenu && <FontAwesomeIcon icon={faCheck} />}
          </button>
          <ul className={styles.buyForDay}>
            {menuPrint.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </details>
        <details>
          <summary>Oбщий список:</summary>
          <button
            aria-label="копировать список"
            className={styles.handleCopy}
            onClick={handleCopy}
          >
            <FontAwesomeIcon icon={faCopy} />
            <span> </span>
            {showCheck && <FontAwesomeIcon icon={faCheck} />}
          </button>
          <ul className={styles.buyForDay}>
            {Object.entries(sumIngredientsPrint).map(([ingredient, weight]) => (
              <li key={ingredient}>
                {ingredient}: {weight as number}
              </li>
            ))}
          </ul>
        </details>
        {showTooltip && (
          <div className={styles.tooltip}>Cписок скопирован!</div>
        )}
      </div>
      <textarea
        ref={textareaRef}
        style={{ position: "absolute", left: "-9999px" }} // Hide the textarea off-screen
        readOnly
      />
    </>
  );
}
