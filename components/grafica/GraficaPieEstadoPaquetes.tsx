import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["En oficina", "En ruta", "Entregados"],
  datasets: [
    {
      label: "",
      data: [18, 35, 43],
      backgroundColor: [
        "rgba(255, 99, 132, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(54, 162, 235, 0.8)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(54, 162, 235, 1)",
      ],
      borderWidth: 2,
    },
  ],
};

export function GraficaPieEstadoPaquetes() {
  return <Pie data={data} />;
}
