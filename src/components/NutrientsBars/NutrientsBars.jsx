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

const NutrientBar = ({ label, value, max, color }) => {
  const data = {
    labels: [label],
    datasets: [
      {
        label,
        data: [parseFloat(value.toFixed(1))],
        backgroundColor: [color],
        borderRadius: 10,
        barThickness: 25,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
      easing: 'easeOutQuart',
    },
    scales: {
      x: {
        max,
        beginAtZero: true,
   ticks: {
  callback: function(value) {
    return value === 0 || value === max ? value : '';
  },
  
  background: 'var(--tg-theme-bg-color)',
  color: 'var(--tg-theme-text-color)',
  font: {
    size: 14,
  },
},
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          background: 'var(--tg-theme-bg-color)',
  color: 'var(--tg-theme-text-color)',
          font: {
            size: 14,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.x} г`,
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

export const NutrientBars = ({ data, maxValues }) => {
  return (
    <div className="space-y-4">
      <NutrientBar
        label="Carbs"
        value={data.carbs}
        max={maxValues.carbs}
        color="#FF6384"
      />
      <NutrientBar
        label="Fat"
        value={data.fat}
        max={maxValues.fat}
        color="#36A2EB"
      />
      <NutrientBar
        label="Protein"
        value={data.protein}
        max={maxValues.protein}
        color="#FFCE56"
      />
    </div>
  );
};
