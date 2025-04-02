import axios from "axios";

const url = process.env.REACT_APP_URL;
export const getFoodById = async (id) => {
  try {
    const response = await axios.get(`${url}/food-details`, {
      params: { id },
    });
    // Проверяем, что в ответе есть объект 'foods' и массив 'food'
    if (response.data) {
      console.log(response.data);
      return response.data; // Возвращаем массив продуктов
    } else {
      return []; // Если нет продуктов, возвращаем пустой массив
    }
  } catch (error) {
    console.error("Error searching for food:", error.message);
    return [];
  }
};
