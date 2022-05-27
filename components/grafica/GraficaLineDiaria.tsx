import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"];

const data = {
  labels,
  datasets: [
    {
      label: "En oficina",
      data: [38, 20, 43, 35, 18, 18],
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "En curso ",
      data: [63, 55, 43, 62, 69, 35],
      borderColor: "rgba(255, 206, 86, 1)",
      backgroundColor: "rgba(255, 206, 86, 0.5)",
    },
    {
      label: "Entregados",
      data: [65, 63, 73, 48, 69, 43],
      borderColor: "rgba(54, 162, 235, 1)",
      backgroundColor: "rgba(54, 162, 235, 0.5)",
    },
  ],
};

export function GraficaLineDiaria() {
  return <Line options={options} data={data} />;
}
