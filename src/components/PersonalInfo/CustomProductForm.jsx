
import React, { useState } from "react";
import axios from "axios";  
import { toast } from "react-toastify";
import { Label, Input,Form, Button } from "../../styles/FormElements.styled";
export const CustomProductForm = ({ onBack}) => {
  const [product, setProduct] = useState({
    name: "",
    protein: 0,
    fat: 0,
    carbs: 0,
    calories: 0,

  });

  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe?.user?.id;
  const url = process.env.REACT_APP_URL;

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/add-custom`, {
        userId: user,
        product,
      });
      toast.success("Продукт добавлен!");
      onBack();
    } catch (error) {
      console.error("Ошибка при добавлении продукта:", error.message);
      toast.error("Не удалось добавить продукт.", error.message);
    }
  };
 return (<>
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
    <Label>
          Калории (ккал):
          <Input
             type="number"
             value={product.calories}
             onChange={(e) =>
                setProduct({ ...product, calories: parseFloat(e.target.value) || 0 })
             }
          />
    </Label>
    <Button type="submit">Добавить продукт</Button>
    <Button type="button" onClick={onBack} style={{ marginLeft: '10px' }}>Назад</Button>
      </Form>
 
 </>)

}