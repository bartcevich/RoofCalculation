"use client";
import React, { useEffect, useState, useContext, useRef } from "react";
import { IngredientsContext } from "@/context/IngredientsContext";
import styles from "./styles.module.scss";

interface MondayProps {
  day: string;
}

export default function MenuGroups(props: MondayProps) {
  const { userChoice, setUserChoice } = useContext(IngredientsContext);
  const [userInput, setUserInput] = useState<any>({ menuText: "" });
  const [userInput1, setUserInput1] = useState<any>(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  //1 отделение от ключа сохраненного выбора пользователя
  const dataForComponent = () => {
    const stateFirstUndefined: any = userChoice;
    setUserInput(
      stateFirstUndefined[`${props.day}_nameMenu`] || { menuText: "" }
    );
  };
  useEffect(() => {
    if (
      userInput1 === false &&
      typeof userChoice === "object" &&
      userChoice !== null &&
      Object.keys(userChoice).length > 0
    ) {
      setUserInput1(userChoice);
      dataForComponent();
    }
  }, [userInput1, userChoice]);
  // получение данных введенных пользователем
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputs = {
      ...userInput,
      [e.target.name]: e.target.value,
    };
    setUserInput(newInputs);
    //console.log(newInputs);
  };
  // добавление ключа от этого компонента и сохранение
  const savingToContext = () => {
    if (userInput["menuText"] !== "" && userInput["menuText"] !== " ") {
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Set a new timeout to save the input after 2 seconds
      timeoutRef.current = setTimeout(() => {
        setUserChoice((prevUserChoice) => ({
          ...prevUserChoice,
          [`${props.day}_nameMenu`]: {
            ...userInput,
          },
        }));
      }, 1000);
    }
  };
  //вызов через useEffect устранил потерю последнего символа
  useEffect(() => {
    savingToContext();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [userInput]);

  return (
    <>
      <div className={styles.container_top}>
        <input
          className={styles.container_input}
          type="text"
          name="menuText"
          value={userInput.menuText || ""}
          maxLength={25}
          onChange={handleInputChange}
          placeholder="Меню для..."
        />
      </div>
    </>
  );
}
