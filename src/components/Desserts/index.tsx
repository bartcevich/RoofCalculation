"use client";
import React, { useEffect, useState, useContext } from "react";
import { IngredientsContext } from "@/context/IngredientsContext";
import styles from "./styles.module.scss";

const DataTable: React.FC = () => {
  const [data, setData] = useState([
    {
      type: "fix",
      name: "Саморез",
      material: "plastic",
      unit: "шт",
      width: 20,
      price: 1.1,
      quantity: 0,
    },
  ]);
  const { userChoice, setUserChoice } = useContext(IngredientsContext);
  const [selectedList, setSelectedList] = useState<any>({});
  const [selectedPipe, setSelectedPipe] = useState<any>({});
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(0);
  const [strong, setStrong] = useState<any>({});

  const pipeLengthAll = () => {
    if (Object.keys(selectedPipe).length > 0) {
      const numberStep = Math.ceil(
        width / (strong.step + selectedPipe.width / 1000)
      );
      const numberStepLength = Math.ceil(
        length / (strong.step + selectedPipe.width / 1000)
      );
      const fixIfMaterial = selectedList.material === "plastic" ? 10 : 5;
      const pipeLength =
        (numberStep + 1) * length + (numberStepLength + 1) * width;
      setData([
        {
          type: "list",
          name: selectedList.name,
          material: "plastic",
          unit: "м2",
          width: 30,
          price: selectedList.price,
          quantity: Math.ceil((width * length) / selectedList.width),
        },
        {
          type: "pipe",
          name: `${selectedPipe.name} (тип: ${strong.name})`,
          material: "plastic",
          unit: "мп",
          width: 30,
          price: selectedPipe.price,
          quantity: pipeLength,
        },
        {
          type: "fix",
          name: "Саморез",
          material: "",
          unit: "шт",
          width: 30,
          price: 1.1,
          quantity: Math.ceil(width * length * fixIfMaterial),
        },
        {
          type: "",
          name: `размер ячейки ${(width / numberStep).toFixed(2)}X${(
            length / numberStepLength
          ).toFixed(2)}`,
          material: "",
          unit: "м",
          width: 0,
          price: 0,
          quantity: 0,
        },
        {
          type: "",
          name: `площадь изделия ${(width * length).toFixed(2)}`,
          material: "",
          unit: "м",
          width: 0,
          price: 0,
          quantity: 0,
        },
      ]);
      // console.log(numberStep, selectedList.material, fixIfMaterial);
    }
  };
  useEffect(() => {
    pipeLengthAll();
  }, [selectedPipe, width, length, strong, selectedList]);

  //выбор пользователя List and Pipe
  const dataForComponent = () => {
    const stateFromContext: any = userChoice;
    if (
      stateFromContext.selectedWidth >= 5 &&
      stateFromContext.selectedLength >= 5
    ) {
      setWidth(stateFromContext.selectedWidth || {});
      setLength(stateFromContext.selectedLength || {});
      setSelectedList(stateFromContext.selectedOption || {});
      setSelectedPipe(stateFromContext.selectedPipe || {});
      setStrong(stateFromContext.strong || {});
      pipeLengthAll();
    }
  };

  // Вычисляем общую сумму
  const totalSum = data.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (
      typeof userChoice === "object" &&
      userChoice !== null &&
      Object.keys(userChoice).length > 0
    ) {
      dataForComponent();
    }
  }, [userChoice]);

  return (
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={cellStyle}>Наименование</th>
            <th style={cellStyle}>ед</th>
            <th style={cellStyle}>кол-во</th>
            <th style={cellStyle}>сумма</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const sum = item.price * item.quantity; // Считаем сумму
            return (
              <tr key={index}>
                <td style={cellStyle}>{item.name}</td>
                <td style={cellStyle}>{item.unit}</td>
                <td style={cellStyle}>{item.quantity}</td>
                <td style={cellStyle}>{sum.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ marginTop: "10px", fontWeight: "bold" }}>
        Итого: {totalSum.toFixed(2)} Руб.
      </div>
    </div>
  );
};

// Стили ячеек
const cellStyle: React.CSSProperties = {
  border: "1px solid #E47611", // Граница ячеек
  padding: "8px",
  textAlign: "left",
};

export default DataTable;
