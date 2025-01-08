export const convertServing = (description) => {
  const match = description.match(
    /Per\s([\d\s\w]+)\s-\sCalories:\s([\d.]+)kcal\s\|\sFat:\s([\d.]+)g\s\|\sCarbs:\s([\d.]+)g\s\|\sProtein:\s([\d.]+)g/
  );
  if (!match) return null;

  const [serving, calories, fat, carbs, protein] = match;

  // Определяем коэффициент конверсии
  let conversionFactor = 1;
  if (serving.includes("100g")) {
    conversionFactor = 1;
  } else if (serving.includes("g")) {
    const grams = parseFloat(serving);
    conversionFactor = 100 / grams;
  } else if (serving.includes("oz")) {
    const ouncesMatch = serving.match(/([\d.]+)\s*oz/);
    if (ouncesMatch) {
      const ounces = parseFloat(ouncesMatch[1]);
      const grams = ounces * 28.3495; // 1 oz = 28.3495 g
      conversionFactor = 100 / grams;
    }
  } else if (serving.includes("slice")) {
    const slicesMatch = serving.match(/([\d.]+)\s*slice/);
    if (slicesMatch) {
      const slices = parseFloat(slicesMatch[1]);
      const grams = slices * 28; // 1 slice = 28 g;
      conversionFactor = 100 / grams;
    }
  }

  return {
    calories: (parseFloat(calories) * conversionFactor).toFixed(2),
    fat: (parseFloat(fat) * conversionFactor).toFixed(2),
    carbs: (parseFloat(carbs) * conversionFactor).toFixed(2),
    protein: (parseFloat(protein) * conversionFactor).toFixed(2),
  };
};
