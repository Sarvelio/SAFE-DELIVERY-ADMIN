import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["No perecederos", "Documentos", "Alimento", "Fragil"],
  datasets: [
    {
      label: "",
      data: [186, 46, 38, 83],
      backgroundColor: [
        "rgba(228, 206, 18, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(255, 159, 64, 0.7)",
        "rgba(255, 75, 132, 0.7)",
      ],
      borderColor: [
        "rgba(228, 206, 18, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255, 75, 132, 1)",
      ],
      borderWidth: 2,
    },
  ],
};

export function GraficaPieTIpoPaquete() {
  return <Pie data={data} />;
}
