"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";

interface XAxisSettingsProps {
  xValues: number[]; //массив значений оси Х
  onXValuesChange: (values: number[]) => void; // функция добавления массива ко всем графикам
}

export const LineRow: React.FC<XAxisSettingsProps> = ({
  xValues,
  onXValuesChange,
}) => {
  const [fieldFrom, setFieldFrom] = useState<number>(
    xValues[xValues[0]] || -100
  );
  const [fieldTo, setFieldTo] = useState<number>(
    xValues[xValues.length - 1] || -10
  );
  const [fieldStep, setFieldStep] = useState<number>(
    xValues[Math.abs(xValues[1] - xValues[0])] || 10.99
  );

  const updateValues = () => {
    // const { from, to, step } = inputValues;
    let count;
    if (fieldTo >= fieldFrom) {
      count = Math.floor((fieldTo - fieldFrom) / fieldStep) + 1;
    } else {
      count = Math.floor((fieldTo - fieldFrom) / fieldStep) + 1; // Исправлено: для отрицательного диапазона
      if (count < 0) count = 0; // Дополнительная проверка, count не может быть отрицательным
    }
    const newValues = Array.from(
      { length: count },
      (_, i) => fieldFrom + i * fieldStep
    );
    //Если from > to, то последовательность будет в обратном порядке.
    if (fieldTo < fieldFrom) {
      newValues.reverse();
    }
    onXValuesChange(newValues);
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFieldFrom(Number(value));
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFieldTo(Number(value));
    // console.log("change field", value);
  };

  const handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.abs(Number(e.target.value));
    setFieldStep(value === 0 ? 1 : value);
  };

  const handleBlurOrKeyDown = (e: React.KeyboardEvent | React.FocusEvent) => {
    if ("key" in e && e.key !== "Enter") return;
    // updateValues();
  };

  return (
    <div className={styles.xSettings}>
      <h3>Настройки оси X</h3>
      <div className={styles.rangeInput}>
        <label>
          Диапазон:
          <input
            type="number"
            placeholder="От"
            value={fieldFrom}
            onChange={handleFromChange}
            onBlur={handleBlurOrKeyDown}
            onKeyDown={handleBlurOrKeyDown}
          />
          <input
            type="number"
            placeholder="До"
            value={fieldTo}
            onChange={handleToChange}
            onBlur={handleBlurOrKeyDown}
            onKeyDown={handleBlurOrKeyDown}
          />
        </label>
        <label>
          Шаг:
          <input
            type="number"
            value={fieldStep}
            onChange={handleStepChange}
            onBlur={handleBlurOrKeyDown}
            onKeyDown={handleBlurOrKeyDown}
            min="0.01" // Минимальное положительное значение шага
          />
        </label>
        <button className={styles.editButton} onClick={updateValues}>
          Применить
        </button>
      </div>
    </div>
  );
};
