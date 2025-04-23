import styled, { keyframes } from "styled-components";

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOutScale = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isClosing ? 0 : 1)};
  transition: opacity 0.3s ease-out;
  z-index: 999;
`;

export const ModalContent = styled.div`
  position: relative;
  background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
  padding: 24px 20px;
  width: 90%;
  max-width: 420px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  animation: ${({ isClosing }) => (isClosing ? fadeOutScale : fadeInScale)} 0.3s ease;

  h2 {
    margin: 0 0 12px;
    font-size: 20px;
    font-weight: 600;
  }

  p {
    margin: 6px 0;
    font-size: 14px;
  }

  select {
    margin-top: 6px;
    padding: 8px;
    font-size: 14px;
    border-radius: 8px;
    border: 1px solid #ccc;
    background: var(--tg-theme-bg-color);
    color: var(--tg-theme-text-color);
    width: 100%;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background: none;
  color: var(--tg-theme-text-color);
  border: none;
  font-size: 1.5rem;
  &:hover {
    color: #40a7e3;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
`;

export const Section = styled.div`
  margin-top: 16px;
`;

export const ChartWrapper = styled.div`
  margin-top: 20px;
  max-width: 280px;
  margin-left: auto;
  margin-right: auto;
`;
export const StyledSelect = styled.select`
 padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
  flex: 1;
  max-width: 160px;

  /* Скрываем дефолтную стрелку */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  /* Кастомная стрелка */
  background-image: url("data:image/svg+xml,%3Csvg fill='black' xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;

  padding-right: 36px;

  &:focus {
    outline: none;
    border-color: var(--tg-theme-button-color);
  }
`;
