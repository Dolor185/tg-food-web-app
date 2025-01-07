import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { searchFood } from "../../hooks/searchFood";
import { Ul } from "./ResultsTable.styled";

export const ResultsTable = () => {
  const { product } = useContext(ProductContext);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!product) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await searchFood(product);

        setResults(response);
      } catch (err) {
        setError(err.message);

        console.error("Failed to fetch results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [product]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!results.length) {
    return <div>No results found</div>;
  }

  const productList = results.map((product) => (
    <li key={product.food_id}>
      {product.food_name}: {product.food_description}
    </li>
  ));

  return (
    <div>
      <span>Results for: {product}</span>
      <Ul>{productList}</Ul>
    </div>
  );
};
