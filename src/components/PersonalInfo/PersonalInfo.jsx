import React, { useEffect, useState, useCallback } from "react";
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  Product, ProductInfo,ButtonsRow, ChartWrapper, Title, Subtitle
} from "./PersonalInfo.styled";
import axios from "axios";
import { NutrientBars } from "../NutrientsBars/NutrientsBars";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { toast } from "react-toastify";
import { Button } from "../../styles/FormElements.styled";
import { History } from "../History/History";
import { PeriodPicker } from "./PeriodPicker";
import { CustomLimits } from "./CustomLimits";
import { CustomProductsList } from "./CustomProduct/CustomProductsList";

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
  const [modalView, setModalView] = useState("main");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const getData = useCallback(async () => {
    try {
      const [nutrientsRes, limitsRes] = await Promise.all([
        axios.get(`${url}/check-nutrients`, { params: { user,date } }),
        axios.get(`${url}/limits`, { params: { user } }),
      ]);
      console.log("👀 nutrientsRes.data:", nutrientsRes.data);
      const nutrientData = nutrientsRes.data;

if (nutrientData && nutrientData.totalNutrients) {
  setData(nutrientData.totalNutrients);
  const allProducts = [
    ...(nutrientData.meals?.Breakfast || []),
    ...(nutrientData.meals?.Lunch || []),
    ...(nutrientData.meals?.Dinner || []),
    ...(nutrientData.meals?.Snacks || []),
  ];
  setProducts(allProducts);
} else {
  setData(null);
  setProducts([]);
}

      setOriginalMaxValues(limitsRes.data);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      toast.error("Ошибка при получении данных");
    }
  }, [url, user, date]);

  useEffect(() => {
    if (!isOpen) return;
    getData();
    
  }, [isOpen, user, date]);

  useEffect(() => {
    const scaled = {
      protein: (originalMaxValues.protein || 0) * period,
      fat: (originalMaxValues.fat || 0) * period,
      carbs: (originalMaxValues.carbs || 0) * period,
      dailyCalories: (originalMaxValues.dailyCalories || 0) * period,
    };
    setMaxValues(scaled);
  }, [period, originalMaxValues]);

  const handleDelete = async (entryId) => {
    try {
      await axios.get(`${url}/delete-product`, {
        params: { entryId, user, date },
      });

      setProducts((prev) =>
        prev.filter((product) => product.entryId !== entryId)
      );
      getData();
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  const handlePeriodChange = async (newPeriod) => {
    try {
      setPeriod(newPeriod);
      await axios.post(`${url}/update-period`, {
        userId: user,
        period: newPeriod,
      });

      const limits = await axios.get(`${url}/limits`, { params: { user } });
      setMaxValues(limits.data);
      setModalView("main");
      toast.success("Period updated successfully");
    } catch (error) {
      console.error("Ошибка при обновлении периода:", error);
    }
  };

  const handleRestoreDefaults = async () => {
    try {
      const response = await axios.post(`${url}/restore-nutrients`, {
        userId: user,
      });

      const { protein, fat, carbs } = response.data.nutrients;
      const dailyCalories = protein * 4 + fat * 9 + carbs * 4;

      const restored = { protein, fat, carbs, dailyCalories };
      setMaxValues(restored);
      toast.success("Restored default values successfully");
    } catch (error) {
      console.error("Ошибка при восстановлении:", error);
      toast.error("Error restoring default values");
    }
  };

  const onDateChange = (e) => {
    const selectedDate = new Date(e.target.value).toISOString().slice(0, 10);
    setDate(selectedDate);
  }

  const pieData = {
    labels: ["Used", "Rest"],
    datasets: [
      {
        label: "Calories",
        data: [
          data?.calories.toFixed(2) || 0,
          Math.max(maxValues.dailyCalories - data?.calories, 0).toFixed(2),
        ],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const pieOptions = {
    plugins: {
      datalabels: {
        color: "white",
        font: { weight: "bold" },
        formatter: (value, ctx) => {
          const total = ctx.chart.data.datasets[0].data.reduce((sum, val) => sum + val, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${value} ккал (${percentage}%)`;
        },
      },
    },
  };

  const renderContent = () => {
    switch (modalView) {
      case "customLimits":
        return (
          <CustomLimits
            setMaxValues={setMaxValues}
            onBack={() => setModalView("main")}
          />
        );
      case "period":
        return (
          <PeriodPicker handlePeriodChange={handlePeriodChange}  onBack={() => setModalView("main")}/>
        );
        case "history":
          return <History userId={user} onBack={() => setModalView("main")}/>;
          case  "customProducts":
            return (
              <CustomProductsList
                userId={user}
                onBack={() => setModalView("main")}
              />
            );
      default:
        return (
          <>
            <CloseButton onClick={onClose}>×</CloseButton>
            <Title>{tg.initDataUnsafe?.user?.username}'s personal info</Title>
            <Subtitle>Here is your daily nutrient goals  and list of products</Subtitle>
<ButtonsRow>
            <Button onClick={() => setModalView("period")}>Choose period</Button>
            <Button onClick={() => setModalView("customLimits")}>Custom limits</Button>
            <Button onClick={() => setModalView("history")}>History</Button>
            <Button onClick={() => setModalView("customProducts")}>My products</Button></ButtonsRow>
            {data && <NutrientBars data={data} maxValues={maxValues} />}

            <ChartWrapper style={{ width: "100%", height: "250px" }}>
              <Pie data={pieData} options={pieOptions} />
            </ChartWrapper>

            {products.length > 0 &&
              products.map((product) => (
                <Product key={product.entryId}>
                  <ProductInfo>
                  <p>{product.name}</p>
                  <p>{product.amount} ({product.metric_serving_unit})</p>
                  </ProductInfo>
                  <Button onClick={() => handleDelete(product.entryId)}>Delete</Button>
                </Product>
              ))}

            <Button onClick={handleRestoreDefaults} style={{ marginTop: "10px" }}>
            Restore recommended values            </Button>

              <select onChange={onDateChange} value={date} type="date" style={{ marginTop: "10px", width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", backgroundColor: "var(--tg-theme-secondary-bg-color)", color: "var(--tg-theme-text-color)" }}>
              <option value={new Date().toISOString().slice(0, 10)}>{new Date().toISOString().slice(0, 10)}</option>
              <option value={new Date(Date.now() + 86400000).toISOString().slice(0, 10)}>{new Date(Date.now() + 86400000).toISOString().slice(0, 10)}</option>  
              </select>

          </>
        );
    }
  };

  return (
    <>
      <ModalOverlay $isClosing={isClosing} onClick={onClose} />
      <ModalContent $isClosing={isClosing}>
        {renderContent()}
      </ModalContent>
    </>
  );
};
