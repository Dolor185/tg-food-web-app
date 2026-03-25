import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Form, Label, Input, Button } from "../../../styles/FormElements.styled";
import { ModalOverlay, ModalContent, CloseButton } from "../../../styles/Modal.styled";
import { StyledSelect } from "../../Modal/Modal.styled";

const toLocalYMD = (d = new Date()) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const addDaysLocalYMD = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return toLocalYMD(d);
};

export const ModalCustom = ({ onClose, product, userId }) => {
  const url = process.env.REACT_APP_URL;

  const [value, setValue] = useState("");
  const [meal, setMeal] = useState("Breakfast");
  const [date, setDate] = useState(toLocalYMD());

  const calories = product.protein * 4 + product.fat * 9 + product.carbs * 4;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amount = parseFloat(value);
    if (!amount || Number.isNaN(amount)) {
      toast.error("Enter valid weight");
      return;
    }

    const factor = amount / 100;
    const entryId = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

    const nutrients = {
      calories: calories * factor,
      protein: product.protein * factor,
      fat: product.fat * factor,
      carbs: product.carbs * factor,
    };

    const productPayload = {
      entryId,
      id: String(product._id),
      name: product.name,
      amount,
      metric_serving_unit: "g",
      nutrients,
    };

    try {
      await axios.post(`${url}/add-update`, {
        nutrients,
        user: userId,
        product: productPayload,
        date,
        meal,
      });

      toast.success("Product added successfully");
      onClose();
    } catch (error) {
      console.error("Error adding custom product:", error.response?.data || error.message);
      toast.error("Failed to add custom product");
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{product.name}</h2>

        <Form onSubmit={handleSubmit}>
          <Label>
            Weight (g)
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              min="0"
              required
            />
          </Label>

          <Label>
            Meal
            <StyledSelect value={meal} onChange={(e) => setMeal(e.target.value)}required>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snacks">Snacks</option>
            </StyledSelect>
          </Label>

          <Label>
            Date
            <StyledSelect value={date} onChange={(e) => setDate(e.target.value)}>
              {[0, 1, 2, 3, 4, 5, 6].map((d) => {
                const dt = addDaysLocalYMD(d);
                return (
                  <option key={dt} value={dt}>
                    {dt}
                  </option>
                );
              })}
            </StyledSelect>
          </Label>

          <Button type="submit">Add</Button>
        </Form>

        <p>Calories: {calories} kcal</p>
        <p>Proteins: {product.protein} g</p>
        <p>Fats: {product.fat} g</p>
        <p>Carbs: {product.carbs} g</p>

        <CloseButton onClick={onClose}>x</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};