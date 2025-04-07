import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  color: var(--tg-theme-text-color);
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
`;

export const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: var(--tg-theme-text-color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;