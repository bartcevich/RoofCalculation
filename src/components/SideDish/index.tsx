"use client";
import React, { useEffect, useState, useContext } from "react";
import { IngredientsContext } from "@/context/IngredientsContext";
import styles from "./styles.module.scss";
import { getPipeData } from "@/services/data";

interface MondayProps {
  day: any;
}
interface PipeData {
  type: string;
  name: string;
  unit: string;
  width: number;
  price: number;
}

const Starters: React.FC<MondayProps> = (props) => {
  const { userChoice, setUserChoice } = useContext(IngredientsContext);
  const [info, setInfo] = useState(false);
  const SelectedList: PipeData[] = getPipeData();
  const [pipeLong, setPipeLong] = useState(-1);
  const [price, setPrice] = useState(-1);

  const savingToContext = (selectedPipe: any) => {
    setUserChoice((prevUserChoice) => ({
      ...prevUserChoice,
      selectedPipe,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLabel = event.target.value;
    const selectedOption = SelectedList.find(
      (option) => option.name === selectedLabel
    );
    if (selectedOption) {
      setPipeLong(selectedOption.width);
      setPrice(selectedOption.price);
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
              <option value="">Выбор трубы</option>
              {SelectedList.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
            <p>нажмите для выбора трубы</p>
          </div>
          {price > -1 && (
            <>
              <div className={styles.container_button}>
                <p className={styles.button}>цена {price} p/мп</p>
              </div>
              <div className={styles.container_button}>
                {!!info && <p>ширина {pipeLong} мм</p>}
                <div
                  className={styles.dropdownIcon}
                  onClick={() => setInfo((prevValue) => !prevValue)}
                >
                  &#8942;
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Starters;
