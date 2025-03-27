"use client";
import React, { useState, useContext, useEffect } from "react";
import { IngredientsContext } from "@/context/IngredientsContext";
import styles from "./styles.module.scss";
import ShowSevenAndStorage from "@/components/ShowSevenAndStorage";
import Image from "next/image";
import test from "@/assets/images/test.jpg";

const RIGHT_ANSWER = [
  { value: "Enter your answer", label: "Enter your answer" },
  { value: "голубь", label: "голубь" },
  { value: "сорока", label: "сорока" },
  { value: "ворона", label: "ворона" },
];

const LoginForm = () => {
  const { userChoice, setUserChoice } = useContext(IngredientsContext);
  const [today, setToday] = useState(new Date().toDateString());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [answer, setAnswer] = useState("");
  const [screenHeight, setScreenHeight] = useState(0);
  //1 проверка регистрации в этом дне
  useEffect(() => {
    if (
      typeof userChoice === "object" &&
      userChoice !== null &&
      Object.keys(userChoice).length > 0
    ) {
      const stateFirstUndefined: any = userChoice;
      const dataForComponent = stateFirstUndefined["formData"] || {};
      setIsLoggedIn(dataForComponent["today"] === today);
      //console.log("formData", dataForComponent["today"]);
    }
  }, [userChoice]);

  const handleEmailChange = (e: any) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    setIsValidEmail(validateEmail(enteredEmail));
  };

  const handlePasswordChange = (e: any) => {
    const enteredPassword = e.target.value;
    setPassword(enteredPassword);
    setIsValidPassword(validatePassword(enteredPassword));
  };

  const handleAnswerChange = (e: any) => {
    const enteredAnswer = e.target.value;
    setAnswer(enteredAnswer);
  };

  const validateEmail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: any) => {
    //const passwordRegex = /^[A-Za-z\s]{0,20}$/;
    const passwordRegex = /^[^\s]{0,20}$/;
    return passwordRegex.test(password);
  };
  //5 добавление ключа от этого компонента и сохранение
  const savingToContext = () => {
    setUserChoice((prevUserChoice) => ({
      ...prevUserChoice,
      ["formData"]: {
        email: email,
        key: password,
        answer: answer,
        access_key: "60829245-4068-4062-bc62-2704f53261e7",
        today: today,
      },
      ["letterInMail"]: {
        mail: "false",
      },
    }));
    //console.log("f3", formData);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //console.log("state Answer1", answer, isValidEmail, isValidPassword);
    if (isValidEmail && isValidPassword && answer === "сорока") {
      window.navigator.vibrate([500, 500, 500]);
      savingToContext();
      setIsLoggedIn(true);
    } else {
      console.log("Invalid answer, email or password");
    }
  };

  const handleButtonText = () => {
    if (!isValidEmail) {
      return "Введите вашу почту";
    } else if (!isValidPassword) {
      return "Создайте пароль";
    } else if (answer !== "сорока") {
      return "Выберите ответ";
    } else {
      return "Войти";
    }
  };

  useEffect(() => {
    // Check if the window object is available
    if (typeof window !== "undefined") {
      setScreenHeight(window.innerHeight - 540);
    }
  }, []);

  return (
    <>
      {!isLoggedIn ? (
        <div
          className={styles.wrapper}
          style={{ marginBottom: `${screenHeight}px` }}
        >
          <form
            onSubmit={handleSubmit}
            className={`${styles.containerForm} ${
              isLoggedIn ? "animate-slide" : ""
            }`}
          >
            <h3>Регистрация.</h3>
            <label>
              <h3>Введите адрес вашей электронной почты</h3>
              <input
                type="email"
                value={email}
                onInput={handleEmailChange}
                required
                id="email"
                placeholder="Enter a valid email address"
                autoComplete="email"
              />
            </label>
            <br />
            <label>
              <h3>Введите ваш пароль</h3>
              <input
                type="password"
                value={password}
                onInput={handlePasswordChange}
                required
                id="password"
                placeholder={`${
                  password === "" ? "Enter your password" : "password"
                }`}
                autoComplete="current-password"
              />
            </label>
            <br />
            <h3>Выберите правильный ответ</h3>
            <div className={styles.imageTest}>
              <Image src={test} alt="image" />
            </div>
            <select
              className={`formControl ${answer ? "formError" : ""}`}
              // onFocus={() => {
              //   handleInputFocus(setAnswer);
              // }}
              onChange={handleAnswerChange}
              value={answer}
              id="contactAnswer"
              name="answer"
              placeholder={answer === "" ? "Enter your answer" : ""}
            >
              {RIGHT_ANSWER.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {/* <button type="submit" disabled={!isValidEmail || !isValidPassword}> */}
            <button type="submit">
              <div className={styles.button}>{handleButtonText()}</div>
            </button>
          </form>
        </div>
      ) : (
        <ShowSevenAndStorage />
      )}
    </>
  );
};

export default LoginForm;
