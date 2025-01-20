import React from "react";
import { ModalOverlay, ModalContent, CloseButton } from "./Modal.styled";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useState } from "react";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const Modal = ({ isOpen, isClosing, onClose, product }) => {
  if (!isOpen) return null;

  const [value, setValue] = useState("");

  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe?.user?.id;

  const data = {
    labels: ["Protein", "Fat", "Carbs"],
    datasets: [
      {
        label: "Nutritional Values",
        data: [product.protein, product.fat, product.carbs],
        backgroundColor: ["#c5f9d7", "#f7d486", "#f27a7d"],
        hoverBackgroundColor: ["#3a0628", "#082b79", "#0d8582"],
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

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const factor = parseFloat(value) / 100;
    const nutrients = {
      calories: product.calories * factor,
      protein: product.protein * factor,
      fat: product.fat * factor,
      carbs: product.carbs * factor,
    };

    const products = {
      id: product.food_id,
      name: product.food_name,
      amount: Number(value),
      nutrients: {
        calories: product.calories * factor,
        protein: product.protein * factor,
        fat: product.fat * factor,
        carbs: product.carbs * factor,
      },
    };

    await axios.get(`https://tgfood-production.up.railway.app/add-update`, {
      params: {
        nutrients: JSON.stringify(nutrients),
        user,
        products: JSON.stringify(products),
      },
    });

    // onClose();
  };

  return (
    <>
      <ModalOverlay $isClosing={isClosing}>
        <ModalContent $isClosing={isClosing}>
          <CloseButton onClick={onClose}>×</CloseButton>
          <h2>{product.food_name}</h2>
          <form onSubmit={submitForm}>
            <label>
              Weight
              <input
                onChange={handleChange}
                type="text"
                title="Field may contain only latin letters"
                value={value}
              />
            </label>
            <button type="submit">Add</button>
          </form>
          <p>Nutrients per 100g of product:</p>
          <p>Calories: {product.calories} kcal</p>

          <Pie data={data} options={options} />
        </ModalContent>
      </ModalOverlay>
    </>
  );
};
