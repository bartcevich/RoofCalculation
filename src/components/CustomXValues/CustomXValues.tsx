"use client";
import styles from "./styles.module.scss";
import { useState, useEffect, KeyboardEvent } from "react";

interface CustomXValuesProps {
  xValues: number[];
  onXValuesChange: (values: number[]) => void;
}

const CustomXValues = ({ xValues, onXValuesChange }: CustomXValuesProps) => {
  const [inputValues, setInputValues] = useState<string[]>(xValues.map(String));
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    setInputValues(xValues.map(String));
  }, [xValues]);

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleAddField = () => {
    setInputValues([...inputValues, ""]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter") {
      // Если это последнее поле и оно не пустое, добавляем новое поле
      if (
        index === inputValues.length - 1 &&
        inputValues[index].trim() !== ""
      ) {
        handleAddField();
      }
      // В любом случае сохраняем текущие значения
      saveValues();
    }
  };

  const saveValues = () => {
    const parsedValues = inputValues
      .map((value) => parseFloat(value))
      .filter((value) => !isNaN(value));

    if (parsedValues.length > 0) {
      onXValuesChange(parsedValues);
    }
    setIsEditing(false);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  return (
    <div className={styles.customXValues}>
      <h3>Настройка значений X</h3>
      <div className={styles.inputsContainer}>
        {inputValues.map((value, index) => (
          <div key={index} className={styles.inputWrapper}>
            <input
              type="number"
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onBlur={saveValues}
              className={styles.numberInput}
            />
            {index === inputValues.length - 1 && (
              <button
                onClick={handleAddField}
                className={styles.addButton}
                title="Добавить поле"
              >
                +
              </button>
            )}
          </div>
        ))}
      </div>
      {!isEditing && (
        <button onClick={startEditing} className={styles.editButton}>
          Редактировать значения X
        </button>
      )}
    </div>
  );
};
export default CustomXValues;
