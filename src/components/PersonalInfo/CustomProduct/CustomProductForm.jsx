import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Label, Input, Form, Button } from "../../../styles/FormElements.styled";

const calculateCookedMacros = ({ rawWeight, cookedWeight, protein, fat, carbs }) => {
  if (!rawWeight || !cookedWeight) {
    throw new Error("rawWeight and cookedWeight are required");
  }

  const factor = rawWeight / 100;

  const totalProtein = protein * factor;
  const totalFat = fat * factor;
  const totalCarbs = carbs * factor;

  return {
    protein: Number(((totalProtein / cookedWeight) * 100).toFixed(2)),
    fat: Number(((totalFat / cookedWeight) * 100).toFixed(2)),
    carbs: Number(((totalCarbs / cookedWeight) * 100).toFixed(2)),
  };
};

export const CustomProductForm = ({ userId, onSuccess }) => {
  const [product, setProduct] = useState({
    name: "",
    protein: 0,
    fat: 0,
    carbs: 0,
  });

  const [rawWeight, setRawWeight] = useState("");
  const [cookedWeight, setCookedWeight] = useState("");

  const url = process.env.REACT_APP_URL;

  const handleCalculateCooked = () => {
    try {
      const result = calculateCookedMacros({
        rawWeight: parseFloat(rawWeight),
        cookedWeight: parseFloat(cookedWeight),
        protein: parseFloat(product.protein) || 0,
        fat: parseFloat(product.fat) || 0,
        carbs: parseFloat(product.carbs) || 0,
      });

      setProduct((prev) => ({
        ...prev,
        protein: result.protein,
        fat: result.fat,
        carbs: result.carbs,
      }));

      toast.success("Cooked macros calculated");
    } catch (error) {
      toast.error("Enter raw and cooked weight");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${url}/add-custom`, {
        userId,
        product,
      });

      toast.success("Продукт добавлен!");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Ошибка при добавлении продукта:", error.message);
      toast.error("Не удалось добавить продукт.");
    }
  };

  return (
    <Form onSubmit={handleAddProduct}>
      <Label>
        Name of product:
        <Input
          type="text"
          value={product.name}
          required
          onChange={(e) =>
            setProduct({ ...product, name: e.target.value })
          }
        />
      </Label>

      <Label>
        Proteins (g per 100g raw or final product):
        <Input
          type="number"
          min="0"
          step="0.01"
          value={product.protein}
          onChange={(e) =>
            setProduct({ ...product, protein: parseFloat(e.target.value) || 0 })
          }
        />
      </Label>

      <Label>
        Fats (g per 100g raw or final product):
        <Input
          type="number"
          min="0"
          step="0.01"
          value={product.fat}
          onChange={(e) =>
            setProduct({ ...product, fat: parseFloat(e.target.value) || 0 })
          }
        />
      </Label>

      <Label>
        Carbs (g per 100g raw or final product):
        <Input
          type="number"
          min="0"
          step="0.01"
          value={product.carbs}
          onChange={(e) =>
            setProduct({ ...product, carbs: parseFloat(e.target.value) || 0 })
          }
        />
      </Label>

      <Label>
        Raw weight (g):
        <Input
          type="number"
          min="0"
          step="0.01"
          value={rawWeight}
          onChange={(e) => setRawWeight(e.target.value)}
        />
      </Label>

      <Label>
        Cooked weight (g):
        <Input
          type="number"
          min="0"
          step="0.01"
          value={cookedWeight}
          onChange={(e) => setCookedWeight(e.target.value)}
        />
      </Label>

      <Button type="button" onClick={handleCalculateCooked}>
        Calculate cooked macros
      </Button>

      <Button type="submit">Add</Button>
    </Form>
  );
};