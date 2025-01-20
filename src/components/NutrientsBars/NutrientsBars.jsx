import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const NutrientBars = ({ data }) => {
  const maxValues = { carbs: 210, fat: 60, protein: 160 };
  const chartData = {
    labels: ["Carbs", "Fat", "Protein"],
    datasets: [
      {
        label: "Nutrients",
        data: [
          data.carbs.toFixed(1),
          data.fat.toFixed(1),
          data.protein.toFixed(1),
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        max: Math.max(maxValues.carbs, maxValues.fat, maxValues.protein),
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};
