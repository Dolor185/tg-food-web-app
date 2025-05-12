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
  const [ date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [meal, setMeal] = useState('');

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
    const entryId = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

    const nutrients = {
      calories: selectedServing.calories * factor,
      protein: selectedServing.protein * factor,
      fat: selectedServing.fat * factor,
      carbs: selectedServing.carbohydrate * factor,
    };
    const productPayload = {
      entryId:entryId,
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
      await axios.post(`${url}/add-update`, 
        
        { user, date, meal, nutrients, product:productPayload }
      );
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

  const getDitails = async(product) => {

    try {
      const response  = await axios.get(`${url}/food-details`, {
        params: {
          id: product.food_id
        }})
        if (response.data){
          console.log(response);
        }
      
    } catch (error) {
      console.log("Ошибка при получении данных:", error.message);
    }
  }

  return (
    <ModalOverlay $isClosing={isClosing}>
      <ModalContent $isClosing={isClosing}>
        <CloseButton onClick={onClose}>×</CloseButton>

        <h2>{product.food_name}</h2>

        <Form onSubmit={submitForm}>
          <Row>
            <Input
              type="text"
              placeholder="Weitht (grams)"
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
            <StyledSelect onChange={(e) => setMeal(e.target.value)} value={meal}>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </StyledSelect>
            <StyledSelect onChange={(e) => setDate(e.target.value)} value={date}>
              <option value={new Date().toISOString().slice(0, 10)}>{new Date().toISOString().slice(0, 10)}</option>
              <option value={new Date(Date.now() + 86400000).toISOString().slice(0, 10)}>{new Date(Date.now() + 86400000).toISOString().slice(0, 10)}</option>
              <option value={new Date(Date.now() + 172800000).toISOString().slice(0, 10)}>{new Date(Date.now() + 172800000).toISOString().slice(0, 10)}</option>
              <option value={new Date(Date.now() + 259200000).toISOString().slice(0, 10)}>{new Date(Date.now() + 259200000).toISOString().slice(0, 10)}</option>
              <option value={new Date(Date.now() + 345600000).toISOString().slice(0, 10)}>{new Date(Date.now() + 345600000).toISOString().slice(0, 10)}</option> 
              <option value={new Date(Date.now() + 432000000).toISOString().slice(0, 10)}>{new Date(Date.now() + 432000000).toISOString().slice(0, 10)}</option>
              <option value={new Date(Date.now() + 518400000).toISOString().slice(0, 10)}>{new Date(Date.now() + 518400000).toISOString().slice(0, 10)}</option>
              </StyledSelect>
          </Row>
          <Button type="submit">Add</Button>
        </Form>

        <Section>
          <p>Nutrients per {selectedServing.metric_serving_amount} {selectedServing.metric_serving_unit}:</p>
          <p>Calories: {selectedServing.calories} kcal</p>
          <p>Proteins: {selectedServing.protein} g</p>
          <p>Fats: {selectedServing.fat} g</p>
          <p>Carbs: {selectedServing.carbohydrate} g</p>
        </Section>

        <ChartWrapper>
          <Pie data={data} options={options} />
        </ChartWrapper>
        <button onClick={()=>{getDitails(product)}}>Get details</button>
      </ModalContent>
    </ModalOverlay>
  );
};
