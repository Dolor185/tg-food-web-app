import axios from "axios";
const url = process.env.REACT_APP_URL;

export const searchFood = async (query, page = 0) => {
  try {
    const response = await axios.get(`${url}/food-search`, {
      params: { query, page },
    });

    const allFoods =
      response.data?.foods_search?.results?.food || [];

    const words = query
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean); // убираем пустые строки

    const filteredFoods = allFoods.filter((food) => {
      const name = (food.food_name || "").toLowerCase();
      const brand = (food.brand_name || "").toLowerCase();

      const combined = `${name} ${brand}`;

      return words.every((word) => combined.includes(word));
    });

    console.log("Original count:", allFoods.length);
    console.log("Filtered count:", filteredFoods.length);
    console.log("Words:", words);

    return filteredFoods;
  } catch (error) {
    console.error("Error searching for food:", error.message);
    return [];
  }
};
