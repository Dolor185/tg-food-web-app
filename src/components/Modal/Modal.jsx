import React, { useState } from "react";
import { Row, Section, ChartWrapper, StyledSelect } from "./Modal.styled";
import { ModalOverlay, ModalContent, CloseButton } from "../../styles/Modal.styled";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import axios from "axios";
import { toast } from "react-toastify";
import {Input, Button, Form} from '../../styles/FormElements.styled'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const Modal = ({ isOpen, isClosing, onClose, product }) => {
  if (!isOpen) return null;

  const [value, setValue] = useState("");
  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe?.user?.id;
  const url = process.env.REACT_APP_URL;
  const [selectedServing, setSelectedServing] = useState(
    product.servings.serving[0]
  );

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleServingChange = (e) => {
    const servingId = e.target.value;
    const serving = product.servings.serving.find(
      (s) => s.serving_id === servingId
    );
    setSelectedServing(serving);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const amount = parseFloat(value);
    onClose();

toast.success("Product added successfully");

    let factor;

    if (selectedServing.number_of_units === "1.000") {
      // Если сервинг штучный, используем количество сервингов
      factor = amount;
    } else {
      // Если сервинг в граммах, используем вес
      factor = amount / parseFloat(selectedServing.metric_serving_amount);
    }

    const nutrients = {
      calories: selectedServing.calories * factor,
      protein: selectedServing.protein * factor,
      fat: selectedServing.fat * factor,
      carbs: selectedServing.carbohydrate * factor,
    };
    const productPayload = {
      id: product.food_id,
      name: product.food_name,
      amount: amount,
      metric_serving_unit: selectedServing.serving_description,
      nutrients: {
        calories: selectedServing.calories * factor,
        protein: selectedServing.protein * factor,
        fat: selectedServing.fat * factor,
        carbs: selectedServing.carbohydrate * factor,
      },
    };

    try {
      await axios.get(`${url}/add-update`, {
        params: {
          nutrients: JSON.stringify(nutrients),
          user,
          product: JSON.stringify(productPayload),
        },
      });
      // onClose();
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
          selectedServing.protein,
          selectedServing.fat,
          selectedServing.carbohydrate,
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
        font: {
          weight: "bold",
        },
        formatter: (value) => `${value}g`,
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
              type="text"
              placeholder="Вес"
              value={value}
              onChange={handleChange}
              required
            />
            <StyledSelect onChange={handleServingChange} value={selectedServing.serving_id}>
              {product.servings.serving.map((serving) => (
                <option key={serving.serving_id} value={serving.serving_id}>
                  {serving.serving_description}
                </option>
              ))}
            </StyledSelect>
          </Row>
          <Button type="submit">Добавить</Button>
        </Form>

        <Section>
          <p>Нутриенты на {selectedServing.metric_serving_amount} {selectedServing.metric_serving_unit}:</p>
          <p>Калории: {selectedServing.calories} ккал</p>
          <p>Белки: {selectedServing.protein} г</p>
          <p>Жиры: {selectedServing.fat} г</p>
          <p>Углеводы: {selectedServing.carbohydrate} г</p>
        </Section>

        <ChartWrapper>
          <Pie data={data} options={options} />
        </ChartWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};
