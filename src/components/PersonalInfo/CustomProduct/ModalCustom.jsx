import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";


import { ModalOverlay, ModalContent, CloseButton} from "../../../styles/Modal.styled";

export const  ModalCustom = ({onClose, product, userId}) =>{

     const url = process.env.REACT_APP_URL;

     const [value, setValue] = useState(0);

     const calories = product.protein * 4 + product.fat * 9 + product.carbs * 4;



    const handleSubmit = async (e) => {
    e.preventDefault();

    const amount = parseFloat(value);
    onClose();
toast.success("Product added successfully");

const factor = amount/100

const nutrients = {
    calories: calories * factor,
    protein: product.protein * factor,
    fat: product.fat * factor,
    carbs: product.carbs * factor,
  };

  const productPayload = {
    id: parseFloat(product._id),
    name: product.name,
    amount: amount,
    metric_serving_unit: '100g',
    nutrients: {
        calories: calories * factor,
        protein: product.protein * factor,
        fat: product.fat * factor,
        carbs: product.carbs * factor,
    },
  };

  console.log(productPayload)

    try {
        await axios.get(`${url}/add-update`, {
            params: {
              nutrients: JSON.stringify(nutrients),
              user: userId,
              product: JSON.stringify(productPayload),
            },
          });
        
    } catch (error) {
        console.error("Error adding custom product:", error.message);
        toast.error("Failed to add custom product");
        
    }
    }

    return (
        <ModalOverlay>
            <ModalContent>
            <h2>{product.name}</h2>
            <form onSubmit={handleSubmit}> 
<label>
    Wieght
    <input 
    type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        min="0"
    />
</label>
<button type="submit">Add</button>
            </form>
            <p>Калории: {calories} kcal</p>
            <p>Белки: {product.protein}g</p>
            <p>Жиры: {product.fat}g</p>
            <p>Углеводы: {product.carbs}g</p>
            <CloseButton onClick={onClose}>X</CloseButton>
        </ModalContent>
        </ModalOverlay>
    );
}