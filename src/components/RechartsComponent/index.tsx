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

export default function MenuGroups() {
  // Ваши данные по осям
  const lineX = Array.from({ length: 25 }, (_, index) => index * 30);
  const curve1 = [
    0.2, -0.28, -0.32, -0.37, -0.42, -0.44, -0.27, 0.07, 0.56, 1.71, 5.05,
    16.32, 35.58, 166.4, 86.16, 35.07, 18.74, 12.82, 10.02, 8.64, 7.45, 6.38,
    4.72, 2.81, 1.24,
  ]; //[18.86, 48.18, 75.81, 51.06, 17.95, 14.66, 26.1];
  // const curve2 = [0, 108.55, 43.33, 23.85, 36.34, 4.56, -55.3];
  // const curve3 = [0, 30.25, 65.81, 91.06, 61.81, 30.18, -30.18];

  // Формируем единый массив объектов
  const data = lineX.map((x, i) => ({
    name: String(x),
    uv: curve1[i],
    // pv: curve2[i],
    // amt: curve3[i],
  }));

  return (
    <div className={styles.chartWrapper}>
      <LineChart width={1200} height={532} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
        <Line type="monotone" dataKey="amt" stroke="#ffc658" />
      </LineChart>
    </div>
  );
}
