"use client";
import React, { useEffect, useState, useContext } from "react";
import { IngredientsContext } from "@/context/IngredientsContext";
import styles from "./styles.module.scss";
import { getListData } from "@/services/data";

interface MondayProps {
  day: any;
  //setIngredients: React.Dispatch<React.SetStateAction<any[]>>;
  //setLabel: React.Dispatch<React.SetStateAction<any[]>>;
}
interface ListData {
  type: string;
  name: string;
  material: string;
  unit: string;
  width: number;
  price: number;
}

const Starters: React.FC<MondayProps> = (props) => {
  const { userChoice, setUserChoice } = useContext(IngredientsContext);
  const [info, setInfo] = useState(false);
  const SelectedList: ListData[] = getListData();
  const [material, setMaterial] = useState("");
  const [price, setPrice] = useState(-1);

  const savingToContext = (selectedOption: any) => {
    setUserChoice((prevUserChoice) => ({
      ...prevUserChoice,
      // ["selectedList"]: {
      selectedOption,
      // },
    }));
    //console.log("f5", userChoice);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLabel = event.target.value;
    const selectedOption = SelectedList.find(
      (option) => option.name === selectedLabel
    );
    if (selectedOption) {
      setMaterial(selectedOption.material);
      setPrice(selectedOption.price);
      savingToContext(selectedOption);
      //props.setIngredients(Object.entries(selectedOption.value));
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
              <option value="">Выбор листа покрытия</option>
              {SelectedList.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
            <p>нажмите для выбора покрытия</p>
          </div>
          {price > -1 && (
            <>
              <div className={styles.container_button}>
                <p className={styles.button}>
                  цена {price} p/м<sup>2</sup>
                </p>
              </div>
              <div className={styles.container_button}>
                {!!info && <p>материал {material}</p>}
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
