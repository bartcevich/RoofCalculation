"use client";
import React, { useEffect, useState, useContext } from "react";
import { IngredientsContext } from "@/context/IngredientsContext";
import styles from "./styles.module.scss";
import { getFrameData } from "@/services/data";

interface MondayProps {
  day: any;
}
interface ListData {
  type: string;
  key: string;
  name: string;
  step: number;
}

const Salad: React.FC<MondayProps> = (props) => {
  const { userChoice, setUserChoice } = useContext(IngredientsContext);
  const SelectedList: ListData[] = getFrameData();

  const savingToContext = (strong: any) => {
    setUserChoice((prevUserChoice) => ({
      ...prevUserChoice,
      strong,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLabel = event.target.value;
    const selectedOption = SelectedList.find(
      (option) => option.name === selectedLabel
    );
    if (selectedOption) {
      savingToContext(selectedOption);
    }
  };

  return (
    <>
      <div className={styles.container_top}>
        <div>
          <div className={styles.container}>
            <select
              onChange={handleSelectChange}
              className={styles.container_select}
            >
              <option value="">Выбор прочности</option>
              {SelectedList.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
            <p>нажмите для выбора прочности</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Salad;
