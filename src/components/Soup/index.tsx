"use client";

import React, { useEffect, useState, useContext } from "react";
import { IngredientsContext } from "@/context/IngredientsContext";
import styles from "./styles.module.scss";

interface MondayProps {
  width: string;
  height: string;
  setWidth: (values: string) => void;
  setHeight: (values: string) => void;
  // day: any;
}

const Starters: React.FC<MondayProps> = (props) => {
  const { userChoice, setUserChoice } = useContext(IngredientsContext);
  const [width, setWidth] = useState<number | "">("");
  const [length, setLength] = useState<number | "">("");
  const [widthError, setWidthError] = useState<string>("");
  const [lengthError, setLengthError] = useState<string>("");

  const dataForComponent = () => {
    const stateFirstUndefined: any = userChoice;
    if (
      stateFirstUndefined.selectedWidth >= 5 &&
      stateFirstUndefined.selectedLength >= 5
    ) {
      setWidth(stateFirstUndefined.selectedWidth || {});
      setLength(stateFirstUndefined.selectedLength || {});
      // console.log(stateFirstUndefined.selectedPipe);
    }
  };

  const savingToContextWidth = (num: number) => {
    setUserChoice((prevUserChoice) => ({
      ...prevUserChoice,
      ["selectedWidth"]: num,
    }));
  };

  const savingToContextLength = (num: number) => {
    setUserChoice((prevUserChoice) => ({
      ...prevUserChoice,
      ["selectedLength"]: num,
    }));
  };

  const validateWidth = (value: string) => {
    const num = parseFloat(value);
    if (value === "") {
      setWidthError("Введите корректное значение");
      return false;
    }
    if (isNaN(num)) {
      setWidthError("Введите корректное значение");
      return false;
    }
    if (num < 5) {
      setWidthError("Ширина должна быть больше 5 метров");
      return false;
    }
    if (num > 25) {
      setWidthError("Ширина должна быть меньше или равна 25 метрам");
      return false;
    }
    setWidthError("");
    savingToContextWidth(num);
    return true;
  };

  const validateLength = (value: string) => {
    const num = parseFloat(value);
    if (value === "") {
      // setLengthError("Поле не должно быть пустым");
      setLengthError("Введите корректное значение");
      return false;
    }
    if (isNaN(num)) {
      setLengthError("Введите корректное значение");
      return false;
    }
    if (num < 5) {
      setLengthError("Длина должна быть больше 5 метров");
      return false;
    }
    if (num > 50) {
      setLengthError("Длина должна быть меньше или равна 50 метрам");
      return false;
    }
    setLengthError("");
    savingToContextLength(num);
    return true;
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWidth(value === "" ? "" : parseFloat(value));
    props.setWidth(value);
    // validateWidth(value);
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLength(value === "" ? "" : parseFloat(value));
    props.setHeight(value);
    // validateLength(value);
  };

  useEffect(() => {
    if (
      typeof userChoice === "object" &&
      userChoice !== null &&
      Object.keys(userChoice).length > 0
    ) {
      dataForComponent();
    }
  }, []);

  return (
    <div>
      <div>
        <label className={styles.container_select}>
          Ширина (5-25 м):
          <input
            type="number"
            value={props.width}
            step={0.2}
            min={5}
            max={25}
            onChange={handleWidthChange}
          />
        </label>
        {widthError && <p style={{ color: "red" }}>{widthError}</p>}
      </div>
      <div>
        <label className={styles.container_select}>
          Длина (5-50 м):
          <input
            type="number"
            value={props.height}
            step={0.2}
            min={5}
            max={50}
            onChange={handleLengthChange}
          />
        </label>
        {lengthError && <p style={{ color: "red" }}>{lengthError}</p>}
      </div>
    </div>
  );
};

export default Starters;
