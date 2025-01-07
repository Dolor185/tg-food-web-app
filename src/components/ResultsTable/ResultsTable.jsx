import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { searchFood } from "../../hooks/searchFood";
import { ClipLoader } from "react-spinners";
import {
  Ul,
  ListItem,
  ProductName,
  ProductDescription,
  ButtonContainer,
  PageButton,
} from "./ResultsTable.styled";

export const ResultsTable = () => {
  const { product } = useContext(ProductContext);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!product) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await searchFood(product, currentPage);

        setResults(response);
      } catch (err) {
        setError(err.message);

        console.error("Failed to fetch results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [product, currentPage]);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };
  if (loading) {
    return (
      <div>
        <ClipLoader color="#40a7e3" size={40} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!results.length && !loading) {
    return <div>No results found</div>;
  }

  const productList = results.map((product) => {
    return (
      <ListItem key={product.food_id}>
        <ProductName>{product.food_name}</ProductName>
        <ProductDescription>{product.food_description}</ProductDescription>
      </ListItem>
    );
  });

  return (
    <div>
      <Ul>{productList}</Ul>
      <ButtonContainer>
        {currentPage > 0 && (
          <PageButton onClick={handlePreviousPage}>Previous Page</PageButton>
        )}
        <PageButton onClick={handleNextPage}>Next Page</PageButton>
      </ButtonContainer>
    </div>
  );
};
