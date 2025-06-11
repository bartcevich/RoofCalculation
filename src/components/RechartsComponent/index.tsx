"use client";
import React, { useState } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import styles from "./styles.module.scss";
import { LineRow } from "../LineRow";
import Soup from "@/components/Soup";

interface GraphData {
  id: number;
  name: string;
  color: string;
  values: number[];
}

export default function RechartsCurve() {
  const [width, setWidth] = useState<string>("1200");
  const [height, setHeight] = useState<string>("500");
  const [graphs, setGraphs] = useState<GraphData[]>([
    {
      id: 2,
      name: "График 2",
      color: "#82ca9d",
      values: [0, 108.55, 43.33, 23.85, 36.34, 4.56, -55.3],
    },
  ]);

  const [xValues, setXValues] = useState<number[]>(
    [-100, -90, -80, -70, -60, -50, -40, -30, -20, -10]
    // Array.from({ length: 25 }, (_, index) => index * 30)
  );
  // Добавление нового графика
  const addGraph = () => {
    if (graphs.length >= 20) return;

    const newGraph: GraphData = {
      id: Date.now(),
      name: `График ${graphs.length + 1}`,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      values: Array(xValues.length).fill(-1),
    };
    setGraphs([...graphs, newGraph]);
  };

  // Удаление графика
  const removeGraph = (id: number) => {
    setGraphs(graphs.filter((graph) => graph.id !== id));
  };

  // Обновление данных графика
  const updateGraph = (id: number, field: string, value: any) => {
    // console.log("update graph", id, field, value, graphs);
    setGraphs(
      graphs.map((graph) =>
        graph.id === id ? { ...graph, [field]: value } : graph
      )
    );
  };

  // Обновление значений X
  const handleXValuesChange = (values: number[]) => {
    setXValues(values);
    // Обновляем длину значений во всех графиках
    setGraphs(
      graphs.map((graph) => ({
        ...graph,
        values: graph.values
          .slice(0, values.length)
          .concat(
            Array(Math.max(0, values.length - graph.values.length)).fill(0)
          ),
      }))
    );
  };

  // Формируем единый массив объектов для графика
  const chartData = xValues.map((x, i) => {
    const dataPoint: any = { name: String(x) };
    graphs.forEach((graph) => {
      dataPoint[`graph_${graph.id}`] = graph.values[i] || 0;
    });
    return dataPoint;
  });

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <h2>Управление графиками</h2>

        {/* Настройки оси X */}
        <LineRow xValues={xValues} onXValuesChange={handleXValuesChange} />

        <Soup
          setWidth={setWidth}
          setHeight={setHeight}
          width={width}
          height={height}
        />
        {/* Таблица графиков */}
        <div className={styles.graphsTable}>
          <h3>Графики (макс. 20)</h3>
          <button onClick={addGraph} disabled={graphs.length >= 20}>
            Добавить график
          </button>

          <table>
            <thead>
              <tr>
                <th>Название</th>
                <th>Цвет</th>
                {xValues.map((x, i) => (
                  <th key={i}>X={x}</th>
                ))}
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {graphs.map((graph) => (
                <tr key={graph.id}>
                  <td>
                    <input
                      type="text"
                      value={graph.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        updateGraph(graph.id, "name", e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="color"
                      value={graph.color}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        updateGraph(graph.id, "color", e.target.value);
                      }}
                    />
                  </td>
                  {graph.values.map((value, i) => (
                    <td key={i}>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => {
                          const newValues = [...graph.values];
                          newValues[i] = Number(e.target.value);
                          updateGraph(graph.id, "values", newValues);
                        }}
                      />
                    </td>
                  ))}
                  <td>
                    <button onClick={() => removeGraph(graph.id)}>
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* График */}
      <div className={styles.chartWrapper}>
        <LineChart
          width={Number(width)}
          height={Number(height)}
          data={chartData}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          {graphs.map((graph) => (
            <Line
              key={graph.id}
              type="monotone"
              dataKey={`graph_${graph.id}`}
              name={graph.name}
              stroke={graph.color}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </div>
    </div>
  );
}
