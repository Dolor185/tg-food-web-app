import axios from "axios";

export const searchFood = async (query, page = 0) => {
  try {
    const response = await axios.get(
      "http://tgfood-production.up.railway.app/food-search",
      {
        params: { query, page },
      }
    );
    // Проверяем, что в ответе есть объект 'foods' и массив 'food'
    if (response.data && response.data.foods && response.data.foods.food) {
      return response.data.foods.food; // Возвращаем массив продуктов
    } else {
      return []; // Если нет продуктов, возвращаем пустой массив
    }
  } catch (error) {
    console.error("Error searching for food:", error.message);
    return [];
  }
};
