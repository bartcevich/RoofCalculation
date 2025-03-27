"use client";
import React, { useEffect, useState, useContext } from "react";
import styles from "./styles.module.scss";
import { IngredientsContext } from "@/context/IngredientsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBattery } from "@fortawesome/free-solid-svg-icons";
interface Navigator {
  getBattery(): any;
}
import MemoizedLocation from "../Geolocation/geolocation";

export default function TimeEndBackground() {
  const [geo, setGeo] = useState(false);
  const { userChoice, setUserChoice } = useContext(IngredientsContext);
  const [number, setNumber] = useState(1);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentStateBattery, setCurrentStateBattery] = useState("100%");
  // const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  // useEffect(() => {
  //   const handleOnline = () => {
  //     setIsOnline(true);
  //   };
  //   console.log("line1=", isOnline);
  //   const handleOffline = () => {
  //     setIsOnline(false);
  //     console.log("line2=", isOnline);
  //   };

  // window.addEventListener("ononline", handleOnline);
  //   window.addEventListener("offline", handleOffline);

  //   return () => {
  //     window.removeEventListener("online", handleOnline);
  //     window.removeEventListener("offline", handleOffline);
  //   };
  // }, [isOnline, userChoice]);

  const formatter = new Intl.DateTimeFormat("ru", {
    //weekday: "long",
    year: "numeric",
    day: "numeric",
    month: "long",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updateTime = () => {
    setCurrentTime(new Date()); // Update the current time state
  };

  useEffect(() => {
    const timerID = setInterval(() => updateTime(), 1000); // Update time every second
    return () => {
      clearInterval(timerID); // Clear the interval when the component unmounts
    };
  }, []);
  //данные для компонента о номере фона который был выбран или задать 1
  const dataForComponent = () => {
    const stateFirstUndefined: any = userChoice;
    const numberGet = stateFirstUndefined.background || 1;
    setNumber(numberGet);
    //console.log(stateFirstUndefined.background, numberGet, number);
  };
  //задание однократного вызова из памяти номера фона
  useEffect(() => {
    (navigator as unknown as Navigator)
      .getBattery()
      .then((battery: any) => {
        // console.log(battery);
        setCurrentStateBattery(`${Math.round(battery.level * 100)}%`);
      })
      .catch((error: any) => {
        console.error("Failed to get battery info:", error);
      });

    if (
      typeof userChoice === "object" &&
      userChoice !== null &&
      Object.keys(userChoice).length > 0
    ) {
      dataForComponent();
    }
  }, []);
  const handleNumberChange = (event: { target: { value: string } }) => {
    setNumber(parseInt(event.target.value));
  };
  //установка имени класса в зависимости от выбора пользователя
  let backgroundClass =
    number === 1
      ? styles.background1
      : number === 2
      ? styles.background2
      : styles.background3;
  // сохранение выбора  пользователя в хранилище
  const savingToContext = () => {
    setUserChoice((prevUserChoice) => ({
      ...prevUserChoice,
      ["background"]: number,
    }));
  };
  useEffect(() => {
    savingToContext();
  }, [number]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.button}>
          <p>выберите фон:</p>
          <input
            type="range"
            max="4"
            min="1"
            value={number}
            onChange={handleNumberChange}
            id="sliderRange"
          />
        </div>
        <div
          className={styles.geoLocation}
          onClick={() => setGeo((prevValue) => !prevValue)}
        >
          {geo ? <MemoizedLocation /> : <button>Geolocation</button>}
        </div>
        {/* <span id="demo">{number}</span> */}
        {/* <div>
          <span style={{ color: isOnline ? "green" : "red" }}>
            {isOnline ? "Online" : "Offline"}
          </span>
        </div> */}
        <div className={styles.dateTimeFormat}>
          <FontAwesomeIcon icon={faBattery} />={currentStateBattery}
          <span> </span>
          {formatter.format(currentTime)}
        </div>
      </div>
    </>
  );
}
