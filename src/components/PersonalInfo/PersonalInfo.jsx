import React, { useEffect, useState } from "react";
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  Product,
} from "./PersonalInfo.styled";
import axios from "axios";
import { NutrientBars } from "../NutrientsBars/NutrientsBars";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);


export const PersonalInfo = ({ isOpen, isClosing, onClose }) => {
  if (!isOpen) return null;
  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe?.user?.id;

  const url = process.env.REACT_APP_URL;

  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);
  const [originalMaxValues, setOriginalMaxValues] = useState({});
  const [maxValues, setMaxValues] = useState({});
  const [period, setPeriod] = useState(1);
 

  useEffect(() => {
    if (!isOpen) return;

    const getData = async () => {
      try {
        const response = await axios.get(`${url}/check-nutrients`, {
          params: { user },
        });
        setData(response.data[0].totalNutrients);
        setProducts(response.data[0].products);

        const limits = await axios.get(`${url}/limits`, {
          params: { user },
        });

        setOriginalMaxValues(limits.data);
        console.log("Лимиты:", limits.data);
  
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    getData();
  }, [isOpen, user]);

  useEffect(() => {
    // Пересчёт лимитов под период
    const scaled = {
      protein: (originalMaxValues.protein || 0) * period,
      fat: (originalMaxValues.fat || 0) * period,
      carbs: (originalMaxValues.carbs || 0) * period,
      dailyCalories: (originalMaxValues.dailyCalories || 0) * period,
    };
    setMaxValues(scaled);
  }, [period, originalMaxValues]);

  const handleDelete = async (productId) => {
    try {
      await axios.get(`${url}/delete-product`, {
        params: { productId, user },
      });

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Ошибка при удалении продукта:", error);
    }
  };

  const handlePeriodChange = async (newPeriod) => {
    try {
      setPeriod(newPeriod);
      await axios.post(`${url}/update-period`, {
        userId: user,
        period: newPeriod,
      });
  
      const limits = await axios.get(`${url}/limits`, {
        params: { user },
      });
      setMaxValues(limits.data);
    } catch (error) {
      console.error("Ошибка при обновлении периода:", error);
    }
  };

  const pieData = {
    labels: ['Used',' Remaining'],
    datasets: [
      {
        label: "Calories",
        data: [
          data?.calories || 0, Math.max(maxValues.dailyCalories - data?.calories, 0)
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const pieOptions = {
    plugins: {
      datalabels: {
        color: "white",
        font: {
          weight: "bold",
        },
        formatter: (value, ctx) => {
          const total = ctx.chart.data.datasets[0].data.reduce((sum, val) => sum + val, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${value} kcal (${percentage}%)`;
        },
      },
    },
  };
  

  return (
    <>
      <ModalOverlay $isClosing={isClosing} onClick={onClose} />
      <ModalContent $isClosing={isClosing}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>{tg.initDataUnsafe?.user?.username}'s info</h2>
        <p>Here is your nutrient limits and list of products</p>

        {/* Выбор периода */}
        <div style={{ marginBottom: "12px" }}>
          <span style={{ marginRight: "8px" }}>Period:</span>
          {[1, 3, 7].map((p) => (
  <button
    key={p}
    onClick={() => handlePeriodChange(p)}
    style={{
      marginRight: "6px",
      padding: "4px 10px",
      backgroundColor: p === period ? "#3b82f6" : "#ccc",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    {p} day{p > 1 ? "s" : ""}
  </button>
))}
        </div>

        {data && <NutrientBars data={data} maxValues={maxValues} />}
           <Pie data={pieData} options={pieOptions} />

        {products.length > 0 &&
          products.map((product) => (
            <Product key={product.id}>
              <p>{product.name}</p>
              <p>
                {product.amount} ({product.metric_serving_unit})
              </p>
              <button onClick={() => handleDelete(product.id)}>delete</button>
            </Product>
          ))}
      </ModalContent>
    </>
  );
};
