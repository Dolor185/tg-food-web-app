import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
  background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);

  @media (max-width: 480px) {
    width: 90%; /* Уменьшаем ширину на мобильных */
    padding: 12px;
  }
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
  color: #333;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Учитываем padding и border в ширине */
  transition: border-color 0.3s;

  &:focus {
    border-color: #40a7e3;
    outline: none;
    box-shadow: 0 0 4px rgba(64, 167, 227, 0.5);
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 6px;
  }
`;

export const Button = styled.button`
  padding: 10px 16px;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #40a7e3;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #168acd;
  }

  &:active {
    background-color: #0f7cb4;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 8px 12px;
  }
`;
