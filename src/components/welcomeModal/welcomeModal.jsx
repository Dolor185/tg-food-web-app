import React, { useState } from "react";
import axios from "axios";
import { ModalContainer, ModalOverlay, CloseButton, Button, Select, Input, Form } from "./welcomeModal.styled";


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
            <h2>Welcome!</h2>
            <p>Let's see your parameters and goals:</p>
            <Form onSubmit={handleSubmit}>
              <label>
                Weight (kgs):
                <Input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Height (cm):
                <Input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Age:
                <Input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Sex
                <Select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="male">Мужчина</option>
                  <option value="female">Женщина</option>
                </Select>
              </label>
              <label>
                Activity
                <Select
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                >
                  <option value="sedentary">Сидячий образ жизни</option>
                  <option value="light">Легкая активность</option>
                  <option value="moderate">Умеренная активность</option>
                  <option value="active">Интенсивные тренировки</option>
                  <option value="very_active">Очень высокая активность</option>
                </Select>
              </label>
              <label>
                Goal
                <Select name="goal" value={formData.goal} onChange={handleChange}>
                  <option value="maintain">Maintain</option>
                  <option value="lose">Lose</option>
                  <option value="gain">Gain</option>
                </Select>
              </label>
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
                  <label>
                    Белок (г/кг): 
                    <input 
                      type="range" 
                      min="1.0" 
                      max="3.0" 
                      step="0.1" 
                      value= {proteinCoef}
                      onChange={(e) => setProteinCoef(e.target.value)} 
                    />
                    {proteinCoef} г/кг
                  </label>
                </div>

                <div>
                  <label>
                    Жир (г/кг): 
                    <input 
                      type="range" 
                      min="0.5" 
                      max="2.0" 
                      step="0.1" 
                      value={fatCoef}
                      onChange={(e) => setFatCoef(e.target.value)} 
                    />
                    {fatCoef} г/кг
                  </label>
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
