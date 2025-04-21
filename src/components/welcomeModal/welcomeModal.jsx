import React, { useState } from "react";
import axios from "axios";
import { ModalContainer, ModalOverlay, CloseButton, Select} from "./welcomeModal.styled";
import { Input, Form, Button, Label } from "../../styles/FormElements.styled";


export const WelcomeModal = ({ isOpen, onClose }) => {

  const tg = window.Telegram.WebApp;
  const userId = tg.initDataUnsafe?.user?.id;
   const url = process.env.REACT_APP_URL;
  const [formData, setFormData] = useState({
    userId,
    weight: "",
    height: "",
    age: "",
    gender: "male",
    activityLevel: "sedentary",
    goal: "maintain",
  });
  const [calories, setCalories] = useState(null);
  const [nutrients, setNutrients] = useState({});
  const [proteinCoef, setProteinCoef] = useState(null);
  const [fatCoef, setFatCoef] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Отправляем данные на сервер", formData);
    try {
      const response = await axios.post(`${url}/calculate-calories`, formData);

      setCalories(response.data.dailyCalories);
      setNutrients(response.data.nutrients);

      const { proteinCoef, fatCoef } = response.data;
      setProteinCoef(proteinCoef);
      setFatCoef(fatCoef);
      console.log(fatCoef, proteinCoef);

    } catch (error) {
      console.error("Ошибка при расчёте калорий", error.message);
    }
  };
  const handleRecalculate = async () => {
    if (proteinCoef !== null && fatCoef !== null) {
      try {
        // Отправляем новые коэффициенты на сервер для пересчета
        const response = await axios.post(`${url}/update-coefficients`, {
          userId: formData.userId,
          proteinCoef,
          fatCoef,
        });

   
        setNutrients(response.data.nutrients);
      } catch (error) {
        console.error("Ошибка при пересчете на сервере", error.message);
      }
    }
  };

  

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        
        {calories === null ? (
          <>
            <h2>Welcome {tg.initDataUnsafe?.user?.username}!</h2>
            <p>Let's see your parameters and goals:</p>
            <Form onSubmit={handleSubmit}>
              <Label>
                Weight (kgs):
                <Input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </Label>
              <Label>
                Height (cm):
                <Input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                />
              </Label>
              <Label>
                Age:
                <Input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </Label>
              <Label>
                Sex
                <Select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
              </Label>
              <Label>
                Activity
                <Select
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                >
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="active">Active</option>
                  <option value="very_active">Very active</option>
                </Select>
              </Label>
              <Label>
                Goal
                <Select name="goal" value={formData.goal} onChange={handleChange}>
                  <option value="maintain">Maintain</option>
                  <option value="lose">Lose</option>
                  <option value="gain">Gain</option>
                </Select>
              </Label>
              <Button type="submit">Submit</Button>
            </Form>
          </>
        ) : (
          <div>
            <h3>Ваша суточная норма калорий: {calories} ккал </h3>
            <h3>
              Нутриенты : protein {nutrients.protein} g, fat {nutrients.fat} g, carbs {nutrients.carbs} g
            </h3>

            {/* Слайдеры для изменения коэффициентов */}
            {proteinCoef !== null && fatCoef !== null && (
              <>
                <div>
                  <Label>
                    Белок (г/кг): 
                    <Input 
                      type="range" 
                      min="1.0" 
                      max="3.0" 
                      step="0.1" 
                      value= {proteinCoef}
                      onChange={(e) => setProteinCoef(e.target.value)} 
                    />
                    {proteinCoef} г/кг
                  </Label>
                </div>

                <div>
                  <Label>
                    Жир (г/кг): 
                    <Input 
                      type="range" 
                      min="0.5" 
                      max="2.0" 
                      step="0.1" 
                      value={fatCoef}
                      onChange={(e) => setFatCoef(e.target.value)} 
                    />
                    {fatCoef} г/кг
                  </Label>
                </div>

                <Button type="button" onClick={handleRecalculate}>Пересчитать</Button>

                <Button type="button" onClick={onClose}>Done!</Button>
              </>
            )}
           
          </div>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};
