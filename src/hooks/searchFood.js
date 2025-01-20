import axios from "axios";

export const searchFood = async (query, page = 0) => {
  try {
    // http://localhost:3000/food-search
    // https://tgfood-production.up.railway.app/food-search
    const url = process.env.URL;
    const response = await axios.get(`${url}/food-search`, {
      params: { query, page },
    });
    // Проверяем, что в ответе есть объект 'foods' и массив 'food'
    if (response.data && response.data.foods && response.data.foods.food) {
      console.log(response.data);
      return response.data.foods.food; // Возвращаем массив продуктов
    } else {
      return []; // Если нет продуктов, возвращаем пустой массив
    }
  } catch (error) {
    console.error("Error searching for food:", error.message);
    return [];
  }
};
