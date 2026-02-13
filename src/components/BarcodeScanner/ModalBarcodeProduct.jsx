import { useState } from "react";
import axios from "axios";
import { ModalOverlay, ModalContent, CloseButton } from "../../styles/Modal.styled";
import { Form, Label, Input, Button } from "../../styles/FormElements.styled";

export const ModalBarcodeProduct = ({ handleClose, barcode }) => {
  const [form, setForm] = useState({
    name: "",
    metric_serving_unit: "g",
    calories: "",
    protein: "",
    fat: "",
    carbs: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const API_URL =
      process.env.REACT_APP_URL

    await axios.post(`${API_URL}/add-barcode-product`, {
      barcode: String(barcode || "").trim(),
      food_name: form.name.trim(),
      serving:{
        metric_serving_unit: form.metric_serving_unit.trim() || "g",
        calories: Number(form.calories) || 0,
        protein: Number(form.protein) || 0,
        fat: Number(form.fat) || 0,
        carbohydrate: Number(form.carbs) || 0,
      }
      
    });

    handleClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Form onSubmit={submitForm}>
          <Label>
            Product Name:
            <Input name="name" value={form.name} onChange={onChange} required />
          </Label>

          <Label>
            Unit (g/ml/pcs):
            <Input
              name="metric_serving_unit"
              value={form.metric_serving_unit}
              onChange={onChange}
            />
          </Label>

          <Label>
            Calories:
            <Input
              type="number"
              name="calories"
              value={form.calories}
              onChange={onChange}
              required
            />
          </Label>

          <Label>
            Protein:
            <Input
              type="number"
              name="protein"
              value={form.protein}
              onChange={onChange}
              required
            />
          </Label>

          <Label>
            Fat:
            <Input
              type="number"
              name="fat"
              value={form.fat}
              onChange={onChange}
              required
            />
          </Label>

          <Label>
            Carbs:
            <Input
              type="number"
              name="carbs"
              value={form.carbs}
              onChange={onChange}
              required
            />
          </Label>

          <Button type="submit">Add Product</Button>
        </Form>

        <CloseButton type="button" onClick={handleClose}>
          Close
        </CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};
