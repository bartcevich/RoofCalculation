"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";

interface XAxisSettingsProps {
  xValues: number[];
  onXValuesChange: (values: number[]) => void;
}

export const LineRow: React.FC<XAxisSettingsProps> = ({
  xValues,
  onXValuesChange,
}) => {
  const [inputValues, setInputValues] = useState({
    from: xValues[0] || 0,
    to: xValues[xValues.length - 1] || 0,
    step: Math.abs(xValues[1] - xValues[0]) || 30, // Добавляем Math.abs для шага
  });

  useEffect(() => {
    setInputValues({
      from: xValues[0] || 0,
      to: xValues[xValues.length - 1] || 0,
      step: Math.abs(xValues[1] - xValues[0]) || 30, // Добавляем Math.abs для шага
    });
  }, [xValues]);

  const updateValues = () => {
    const { from, to, step } = inputValues;
    let count;
    if (to >= from) {
      count = Math.floor((to - from) / step) + 1;
    } else {
      count = Math.floor((from - to) / step) + 1; // Исправлено: для отрицательного диапазона
      if (count < 0) count = 0; // Дополнительная проверка, count не может быть отрицательным
    }
    const newValues = Array.from({ length: count }, (_, i) => from + i * step);
    //Если from > to, то последовательность будет в обратном порядке.
    if (to < from) {
      newValues.reverse();
    }
    onXValuesChange(newValues);
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const value = Number(e.target.value);
    // console.log(value);
    // // if (String(e.target.value) === "-") {
    // if (e.target.value == '') {
    //   console.log("inside", e.target.value);
    //   //   setInputValues((prev) => ({
    //   //     ...prev,
    //   //     from: Number("-10"),
    //   //   }));
    // } else {
    setInputValues((prev) => ({ ...prev, from: Number(e.target.value) }));
    // }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prev) => ({ ...prev, to: Number(e.target.value) }));
  };

  const handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Шаг должен быть положительным числом
    const value = Math.abs(Number(e.target.value));
    setInputValues((prev) => ({ ...prev, step: value || 1 })); // Минимальный шаг 1
  };

  const handleBlurOrKeyDown = (e: React.KeyboardEvent | React.FocusEvent) => {
    if ("key" in e && e.key !== "Enter") return;
    updateValues();
  };

  return (
    <div className={styles.xSettings}>
      <h3>Настройки оси X</h3>
      <div className={styles.rangeInput}>
        <label>
          Диапазон:
          <input
            type="number" // Изменяем тип на "string" для поддержки отрицательных значений
            placeholder="От"
            value={inputValues.from}
            onChange={handleFromChange}
            onBlur={handleBlurOrKeyDown}
            onKeyDown={handleBlurOrKeyDown}
            step="any" // Позволяем любые числовые значения
          />
          <input
            type="number" // Изменяем тип на "number" для поддержки отрицательных значений
            placeholder="До"
            value={inputValues.to}
            onChange={handleToChange}
            onBlur={handleBlurOrKeyDown}
            onKeyDown={handleBlurOrKeyDown}
            step="any" // Позволяем любые числовые значения
          />
        </label>
        <label>
          Шаг:
          <input
            type="number"
            value={inputValues.step}
            onChange={handleStepChange}
            onBlur={handleBlurOrKeyDown}
            onKeyDown={handleBlurOrKeyDown}
            min="0.1" // Минимальное положительное значение шага
            step="any"
          />
        </label>
        <button onClick={updateValues}>Применить</button>
      </div>
    </div>
  );
};
