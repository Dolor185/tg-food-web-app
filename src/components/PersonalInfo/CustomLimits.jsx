import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Label, Input, Form, Button } from '../../styles/FormElements.styled';

export const CustomLimits = ({ setMaxValues, onBack }) => {
  const [newLimits, setNewLimits] = useState({ protein: 0, fat: 0, carbs: 0 });
  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe?.user?.id;
  const url = process.env.REACT_APP_URL;

  const handleCustomLimitsSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/update-limits`, {
        userId: user,
        nutrients: newLimits,
      });

      toast.success("Limits saved!");

      const dailyCalories = newLimits.protein * 4 + newLimits.fat * 9 + newLimits.carbs * 4;
      const limits = { ...newLimits, dailyCalories };
      setMaxValues(limits);
      onBack();
    } catch (error) {
      console.error("Ошибка при сохранении лимитов:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Form onSubmit={handleCustomLimitsSave}>
      <Label>
        Proteins (g):
        <Input
          type="number"
          value={newLimits.protein}
          onChange={(e) =>
            setNewLimits({ ...newLimits, protein: parseFloat(e.target.value) || 0 })
          }
        />
      </Label>
      <Label>
        Fats (g):
        <Input
          type="number"
          value={newLimits.fat}
          onChange={(e) =>
            setNewLimits({ ...newLimits, fat: parseFloat(e.target.value) || 0 })
          }
        />
      </Label>
      <Label>
        Carbs (g):
        <Input
          type="number"
          value={newLimits.carbs}
          onChange={(e) =>
            setNewLimits({ ...newLimits, carbs: parseFloat(e.target.value) || 0 })
          }
        />
      </Label>
      <Button type="submit">Save</Button>
      <Button type="button" onClick={onBack} style={{ marginLeft: '10px' }}>Back</Button>
    </Form>
  );
};