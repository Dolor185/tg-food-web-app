import axios from "axios";
const url = process.env.REACT_APP_URL;
export const searchFood = async (query, page = 0) => {
  try {
    // http://localhost:3000/food-search
    // https://tgfood-production.up.railway.app/food-search

    const response = await axios.get(`${url}/food-search`, {
      params: { query, page },
    });

    if (
      response.data &&
      response.data.foods_search &&
      response.data.foods_search.results.food
    ) {
      console.log(response.data);
      return response.data.foods_search.results.food;
    } else {
      return []; // Если нет продуктов, возвращаем пустой массив
    }
  } catch (error) {
    console.error("Error searching for food:", error.message);
    return [];
  }
};
