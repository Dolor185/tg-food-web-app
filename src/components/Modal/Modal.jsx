import React, { useEffect, useMemo, useState } from "react";
import { Row, Section, ChartWrapper, StyledSelect } from "./Modal.styled";
import { ModalOverlay, ModalContent, CloseButton } from "../../styles/Modal.styled";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import axios from "axios";
import { toast } from "react-toastify";
import { Input, Button, Form } from "../../styles/FormElements.styled";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const Modal = ({ isOpen, isClosing, onClose, product }) => {
  const url = process.env.REACT_APP_URL;

  // ✅ safe: если product ещё не готов
  const servingsArr = useMemo(() => {
    const s = product?.servings?.serving;
    if (!s) return [];
    return Array.isArray(s) ? s : [s];
  }, [product]);

  const [value, setValue] = useState("");
  const [selectedServing, setSelectedServing] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [meal, setMeal] = useState("");

  // ✅ главное: обновлять selectedServing на новый продукт
  useEffect(() => {
    if (!isOpen) return;
    if (servingsArr.length > 0) setSelectedServing(servingsArr[0]);
    setValue("");
    setMeal("");
    setDate(new Date().toISOString().slice(0, 10));
  }, [isOpen, servingsArr]);

  if (!isOpen) return null;
  if (!product) return null;
  if (!selectedServing) return null;

  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe?.user?.id;

  const handleServingChange = (e) => {
    const servingId = e.target.value;
    const serving = servingsArr.find((s) => String(s.serving_id) === String(servingId));
    setSelectedServing(serving || servingsArr[0]);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const amount = parseFloat(value);
    if (!amount || Number.isNaN(amount)) return;

    onClose();
    toast.success("Product added successfully");

    let factor;
    if (selectedServing.number_of_units === "1.000") {
      factor = amount;
    } else {
      factor = amount / parseFloat(selectedServing.metric_serving_amount || "1");
    }

    const entryId = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

    const nutrients = {
      calories: Number(selectedServing.calories || 0) * factor,
      protein: Number(selectedServing.protein || 0) * factor,
      fat: Number(selectedServing.fat || 0) * factor,
      carbs: Number(selectedServing.carbohydrate || 0) * factor,
    };

    const productPayload = {
      entryId,
      id: product.food_id,
      name: product.food_name,
      amount,
      metric_serving_unit: selectedServing.serving_description,
      nutrients,
      source: product.source || "unknown",
    };

    try {
      await axios.post(`${url}/add-update`, { user, date, meal, nutrients, product: productPayload });
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  const data = {
    labels: ["Protein", "Fat", "Carbs"],
    datasets: [
      {
        label: "Nutritional Values",
        data: [
          Number(selectedServing.protein || 0),
          Number(selectedServing.fat || 0),
          Number(selectedServing.carbohydrate || 0),
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        color: "white",
        font: { weight: "bold" },
        formatter: (v) => `${v}g`,
      },
    },
  };

  return (
    <ModalOverlay $isClosing={isClosing}>
      <ModalContent $isClosing={isClosing}>
        <CloseButton onClick={onClose}>×</CloseButton>

        <h2>{product.food_name}</h2>

        <Form onSubmit={submitForm}>
          <Row>
            <Input
              type="number"
              placeholder="Weight"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />

            <StyledSelect onChange={handleServingChange} value={selectedServing.serving_id}>
              {servingsArr.map((s) => (
                <option key={s.serving_id} value={s.serving_id}>
                  {s.serving_description}
                </option>
              ))}
            </StyledSelect>

            <StyledSelect onChange={(e) => setMeal(e.target.value)} value={meal}>
              <option value="">Meal</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snacks">Snacks</option>
            </StyledSelect>

            <StyledSelect onChange={(e) => setDate(e.target.value)} value={date}>
              {[0, 1, 2, 3, 4, 5, 6].map((d) => {
                const dt = new Date(Date.now() + d * 86400000).toISOString().slice(0, 10);
                return (
                  <option key={dt} value={dt}>
                    {dt}
                  </option>
                );
              })}
            </StyledSelect>
          </Row>

          <Button type="submit">Add</Button>
        </Form>

        <Section>
          <p>
            Nutrients per {selectedServing.metric_serving_amount} {selectedServing.metric_serving_unit}:
          </p>
          <p>Calories: {selectedServing.calories} kcal</p>
          <p>Proteins: {selectedServing.protein} g</p>
          <p>Fats: {selectedServing.fat} g</p>
          <p>Carbs: {selectedServing.carbohydrate} g</p>
        </Section>

        <ChartWrapper>
          <Pie data={data} options={options} />
        </ChartWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};
