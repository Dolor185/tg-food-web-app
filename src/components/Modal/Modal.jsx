import React from "react";
import { ModalOverlay, ModalContent, CloseButton } from "./Modal.styled";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const Modal = ({ isOpen, isClosing, onClose, product }) => {
  if (!isOpen) return null;

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

  return (
    <>
      <ModalOverlay isClosing={isClosing} onClick={onClose}>
        <ModalContent isClosing={isClosing}>
          <CloseButton onClick={onClose}>×</CloseButton>
          <h2>{product.food_name}</h2>
          <form>
            <label>
              <input />
            </label>
          </form>
          <p>Nutrients per 100g of product:</p>
          <p>Calories: {product.calories} kcal</p>

          <Pie data={data} options={options} />
        </ModalContent>
      </ModalOverlay>
    </>
  );
};
