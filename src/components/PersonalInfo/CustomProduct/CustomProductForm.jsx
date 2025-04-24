import React, { useState } from "react";
import axios from "axios";  
import { toast } from "react-toastify";
import { Label, Input, Form, Button } from "../../../styles/FormElements.styled";

export const CustomProductForm = ({ userId, onSuccess }) => {
  const [product, setProduct] = useState({
    name: "",
    protein: 0,
    fat: 0,
    carbs: 0,
    calories: 0,
  });

  const url = process.env.REACT_APP_URL;

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
        Название продукта:
        <Input
          type="text"
          value={product.name}
          onChange={(e) =>
            setProduct({ ...product, name: e.target.value })
          }
        />    
      </Label>
      <Label>
        Белки (г):
        <Input
          type="number"
          value={product.protein}
          onChange={(e) =>
            setProduct({ ...product, protein: parseFloat(e.target.value) || 0 })
          }
        />
      </Label>
      <Label>
        Жиры (г):
        <Input
          type="number"
          value={product.fat}
          onChange={(e) =>
            setProduct({ ...product, fat: parseFloat(e.target.value) || 0 })
          }
        />
      </Label>
      <Label>
        Углеводы (г):
        <Input
          type="number"
          value={product.carbs}
          onChange={(e) =>
            setProduct({ ...product, carbs: parseFloat(e.target.value) || 0 })
          }
        />
      </Label>
 
      <Button type="submit">Добавить продукт</Button>
    </Form>
  );
};
