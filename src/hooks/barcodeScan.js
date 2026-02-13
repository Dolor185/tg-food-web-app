import axios from "axios";

const url = process.env.REACT_APP_URL;

export const barcodeScan = async (code) => {
  try {
    const res = await axios.get(`${url}/getByBarcode`, {
      params: { barcode: String(code).trim() },
    });

    // ✅ 1) если бэк вернул old-format: { source:"local", food:{...} }
    if (res.data?.source === "local" && res.data?.food) {
      return { type: "local", food: res.data.food };
    }

    // ✅ 2) если бэк вернул просто local doc напрямую
    // (на будущее, когда ты перейдёшь на fatsecret-like формат)
    if (res.data?.food_name && res.data?.servings?.serving) {
      return { type: "local", food: res.data };
    }

    // ✅ 3) fatsecret: у тебя может быть { food_id: { value: "..." } } или { food_id: "..." }
    const foodId =
      res.data?.food_id?.value ||
      res.data?.food_id ||
      res.data?.food?.food_id?.value ||
      res.data?.food?.food_id;

    if (foodId) {
      return { type: "fatsecret", foodId: String(foodId) };
    }

    return null;
  } catch (e) {
    if (e.response?.status === 404) return null;
    throw e;
  }
};
