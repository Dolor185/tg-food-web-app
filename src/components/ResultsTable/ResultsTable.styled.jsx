// ResultsTable.styled.js
import styled from "styled-components";

export const Ul = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* По умолчанию 3 продукта в строке */
  gap: 16px;
  list-style: none;
  padding: 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(
      2,
      1fr
    ); /* На планшетах - 2 продукта в строке */
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* На телефонах - 1 продукт в строке */
  }
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.03);
    transition: transform 0.2s ease-in-out;
  }
`;

export const ProductName = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 4px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1rem; /* Чуть меньше текст на телефонах */
  }
`;

export const ProductDescription = styled.span`
  font-size: 0.9rem;
  color: #666;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.8rem; /* Чуть меньше текст на телефонах */
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
`;

export const PageButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #ffffff;
  background-color: #40a7e3;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #168acd;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
`;
