import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo"];

const data = {
  labels,
  datasets: [
    {
      label: "En oficina",
      data: [23, 28, 15, 50, 10, 11],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "En ruta",
      data: [83, 35, 50, 10, 20, 15],
      backgroundColor: "rgb(255, 206, 86)",
    },
    {
      label: "Entregados",
      data: [220, 180, 255, 333, 305],
      backgroundColor: "rgb(54, 162, 235)",
    },
  ],
};

export function GraficaBarMensual() {
  return <Bar options={options} data={data} />;
}
