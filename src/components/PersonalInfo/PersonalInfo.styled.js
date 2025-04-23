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
`;

export const ModalContent = styled.div`
  position: absolute;
background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
  padding: 20px;
  width: 80%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  z-index: 2000;
  animation: ${({ isClosing }) => (isClosing ? fadeOutScale : fadeInScale)} 0.3s
    ease;

  h2 {
    margin-top: 0;
 
  }

  p {
    margin: 8px 0;

  }
`;
export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 22px;
  color: var(--tg-theme-text-color, #000);
  cursor: pointer;
  hover:{
  color: var(--tg-theme-button-color, #007bff);}
`;

export const Product = styled.div`
  background: var(--tg-theme-secondary-bg-color, #f0f0f0);
  padding: 12px;
  margin-top: 10px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

export const ProductInfo = styled.div`
  flex: 1;
  margin-right: 10px;
`;

export const ButtonsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
`;

export const ChartWrapper = styled.div`
  margin: 20px auto;
  max-width: 300px;
`;

export const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 4px;
  font-weight: 600;
`;

export const Subtitle = styled.p`
  color: var(--tg-theme-hint-color, #777);
  font-size: 14px;
  margin-bottom: 16px;
`;
