// ResultsTable.styled.js
import styled, { keyframes } from "styled-components";

export const Ul = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* По умолчанию 3 продукта в строке */
  gap: 16px;
  list-style: none;
  padding: 0;
  background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);

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
 background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
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
background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
  @media (max-width: 480px) {
    font-size: 1rem; /* Чуть меньше текст на телефонах */
  }
`;

export const ProductDescription = styled.span`
  font-size: 0.9rem;
background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
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
  background: var(--tg-theme-bg-color);
  color: #FFFFFF;
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
// анимация для модального окна
const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const fadeOutScale = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
`;

// Оверлей для затемнения фона
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

// Контент модального окна
export const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
  padding: 20px;
  width: 80%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  z-index: 1001;
  animation: ${({ isClosing }) => (isClosing ? fadeOutScale : fadeInScale)} 0.3s
    ease;

  h2 {
    margin-top: 0;
    c
  }

  p {
    margin: 8px 0;
    
  }
`;

// Кнопка закрытия модального окна
export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #40a7e3;
  }
`;
