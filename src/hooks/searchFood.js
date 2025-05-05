import axios from "axios";
const url = process.env.REACT_APP_URL;

export const searchFood = async (query, page = 0) => {
  try {
    const response = await axios.get(`${url}/food-search`, {
      params: { query, page },
    });

    const allFoods =
      response.data?.foods_search?.results?.food || [];

    // Разбиваем запрос на отдельные слова
    const words = query.toLowerCase().split(/\s+/);

    // Фильтруем: продукт должен содержать ВСЕ слова в name или brand_name
    const filteredFoods = allFoods.filter((food) => {
      const name = food.food_name?.toLowerCase() || "";
      const brand = food.brand_name?.toLowerCase() || "";

      return words.every(
        (word) => name.includes(word) || brand.includes(word)
      );
    });

    return filteredFoods;
  } catch (error) {
    console.error("Error searching for food:", error.message);
    return [];
  }
};
