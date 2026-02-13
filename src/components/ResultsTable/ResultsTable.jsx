import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { searchFood } from "../../hooks/searchFood";
import { ClipLoader } from "react-spinners";

import { Ul, ListItem, ProductName, ButtonContainer, PageButton } from "./ResultsTable.styled";

export const ResultsTable = () => {
  const { product, openProductModal } = useContext(ProductContext);

  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!product) return;

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
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

  const handleNextPage = () => setCurrentPage((p) => p + 1);
  const handlePreviousPage = () => setCurrentPage((p) => Math.max(p - 1, 0));

  if (loading) {
    return (
      <div>
        <ClipLoader color="#40a7e3" size={40} />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;
  if (!results.length) return <div>No results found</div>;

  return (
    <div>
      <Ul>
        {results.map((p) => (
          <ListItem key={p.food_id} onClick={() => openProductModal(p)}>
            <ProductName>{p.food_name}</ProductName>
          </ListItem>
        ))}
      </Ul>

      <ButtonContainer>
        {currentPage > 0 && <PageButton onClick={handlePreviousPage}>Previous Page</PageButton>}
        <PageButton onClick={handleNextPage}>Next Page</PageButton>
      </ButtonContainer>
    </div>
  );
};
