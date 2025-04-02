import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { searchFood } from "../../hooks/searchFood";
import { ClipLoader } from "react-spinners";

import { Modal } from "../Modal/Modal";
import {
  Ul,
  ListItem,
  ProductName,
  ButtonContainer,
  PageButton,
} from "./ResultsTable.styled";

export const ResultsTable = () => {
  const { product } = useContext(ProductContext);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!product) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await searchFood(product, currentPage);
        console.log("API response:", response);

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

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    console.log("Selected product:", product);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
      setSelectedProduct(null);
    }, 300);
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
      <ListItem key={product.food_id} onClick={() => openModal(product)}>
        <ProductName>{product.food_name}</ProductName>
        {/* <ProductDescription>{product.food_description}</ProductDescription> */}
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

      <Modal
        isOpen={isModalOpen}
        isClosing={isClosing}
        onClose={closeModal}
        product={selectedProduct}
      />
    </div>
  );
};
