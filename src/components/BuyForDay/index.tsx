"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./styles.module.scss";
import { IngredientsContext } from "@/context/IngredientsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCopy } from "@fortawesome/free-solid-svg-icons";

interface BuyForDayProps {
  day: any;
}

const BuyForDay: React.FC<BuyForDayProps> = (props) => {
  const { userChoice, setUserChoice } = useContext(IngredientsContext);
  const [sumIngredientsPrint, setSumIngredientsPrint] = useState({});
  const [userList, setUserList] = useState<any>({ menuText: "" });
  const [userComment, setUserComment] = useState<any>({ menuText: "" });

  const dataForComponent = () => {
    const stateFirstUndefined: any = userChoice;
    setUserList(
      stateFirstUndefined[`${props.day}_nameMenu`] || { menuText: "" }
    );
    const userChoiceForComponent =
      stateFirstUndefined[`${props.day}_feature`] || {};
    //отделение от ключа сохраненного выбора пользователя
    const oneArrIngredients = Object.values(userChoiceForComponent)
      .map((item: any) => item.ingredients)
      .flat();
    //console.log(props.day, userChoiceForComponent);
    setUserComment(
      stateFirstUndefined[`${props.day}_comment`] || { menuText: "" }
    );

    // const uniqueIngredients: any = new Set(
    //   oneArrIngredients.map((item) => item[0])
    // ); //коллекция уникальных элементов
    // const uniqueIngredientsArr = Array.from(uniqueIngredients); // массив уникальных элементов
    // //console.log(props.day, uniqueIngredientsArr);
    // //вызов функции поиска для каждого наименования
    // setSumIngredientsPrint([]); // Clear the sumIngredientsPrint array
    // for (let i = 0; i < uniqueIngredientsArr.length; i++) {
    //   typeof uniqueIngredientsArr[i] === "string"
    //     ? search(uniqueIngredientsArr[i])
    //     : i;
    // }
    // суммирование значений для каждого наименования
    // function search(ingredients: any) {
    //   let tempNumber = 0;
    //   for (let r = 0; r < oneArrIngredients.length; r++) {
    //     if (ingredients === oneArrIngredients[r][0]) {
    //       tempNumber += oneArrIngredients[r][1];
    //     }
    //   }
    //   setSumIngredientsPrint((prevSumIngredientsPrint) => [
    //     ...prevSumIngredientsPrint,
    //     ${ingredients}: ${tempNumber},
    //   ]);
    // }

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
    //console.log(sumIngredientsPrint);
  };
  //console.log(props.day, sumIngredientsPrint);
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
  //копирование в буфер данных и подтверждение этого на экране
  const [showTooltip, setShowTooltip] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleCopy = () => {
    if (textareaRef.current) {
      const formattedString = Object.entries(sumIngredientsPrint)
        .map(([ingredient, weight]) => `${ingredient}: ${weight}`)
        .join(",\n");
      const formattedComment = Object.values(userComment).join(",\n");
      textareaRef.current.value = `${formattedString}\n${formattedComment}`;
      textareaRef.current.select();
      document.execCommand("copy");
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }
  };
  //включение показа списка покупок
  const [sumIngredients, setSumIngredients] = useState(false);
  const handleIngredients = () => {
    setSumIngredients((prevValue) => !prevValue);
  };

  return (
    <>
      <div className={styles.container}>
        <h3>Cписок {Object.values(userList)}</h3>
        <button
          className={styles.handleIngredients}
          onClick={handleIngredients}
        >
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
        {sumIngredients && (
          <button className={styles.handleCopy} onClick={handleCopy}>
            <FontAwesomeIcon icon={faCopy} />
          </button>
        )}
        {showTooltip && (
          <div className={styles.tooltip}>Cписок скопирован!</div>
        )}
      </div>
      {sumIngredients && (
        <div className={styles.buyForDay}>
          {Object.entries(sumIngredientsPrint).map(([ingredient, weight]) => (
            <div key={ingredient}>
              {ingredient}: {weight as number}
            </div>
          ))}
          {Object.values(userComment)}
          <textarea
            ref={textareaRef}
            style={{ position: "absolute", left: "-9999px" }} // Hide the textarea off-screen
            readOnly
          />
        </div>
      )}
    </>
  );
};

export default BuyForDay;
