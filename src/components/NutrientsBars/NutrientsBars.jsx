import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const getColor = (variable, fallback) =>
  getComputedStyle(document.documentElement).getPropertyValue(variable) || fallback;

const NutrientBar = ({ label, value, max, color }) => {
  const textColor = getColor('--tg-theme-text-color', '#111');
  const bgColor = getColor('--tg-theme-bg-color', '#fff');

  const data = {
    labels: [label],
    datasets: [
      {
        label,
        data: [parseFloat(value.toFixed(1))],
        backgroundColor: `rgba(${hexToRgb(color)}, 0.7)`,
        borderColor: color,
        borderWidth: 1,
        borderRadius: 12,
        barThickness: 28,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: "easeOutCubic",
    },
    scales: {
      x: {
        max,
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value === 0 || value === max ? value : '';
          },
          color: textColor,
          font: { size: 14 },
        },
        grid: { display: false },
      },
      y: {
        ticks: {
          color: textColor,
          font: { size: 14 },
        },
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: bgColor,
        titleColor: textColor,
        bodyColor: textColor,
        callbacks: {
          label: (context) => {
            const value = context.parsed.x;
            const percent = ((value / max) * 100).toFixed(0);
            return `${value} г (${percent}%)`;
          },
        },
      },
      datalabels: {
        color: textColor,
        anchor: 'end',
        align: 'right',
        formatter: (val) => `${val} г`,
        font: {
          weight: 'bold',
        },
      },
    },
  };

  return (
    <div style={{ height: 60 }}>
      <Bar data={data} options={options} />
    </div>
  );
};

// HEX ➜ RGB для rgba()
const hexToRgb = (hex) => {
  hex = hex.replace("#", "");
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r},${g},${b}`;
};

export const NutrientBars = ({ data, maxValues }) => {
  return (
    <div className="space-y-4">
      <NutrientBar
        label="Carbs"
        value={data.carbs}
        max={maxValues.carbs}
        color="#4fc3f7"
      />
      <NutrientBar
        label="Fat"
        value={data.fat}
        max={maxValues.fat}
        color="#ffb74d"
      />
      <NutrientBar
        label="Protein"
        value={data.protein}
        max={maxValues.protein}
        color="#81c784"
      />
    </div>
  );
};
