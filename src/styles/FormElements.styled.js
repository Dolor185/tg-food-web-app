import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.text || "#333"};
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.inputBorder || "#ccc"};
  background-color: ${({ theme }) => theme.inputBg || "#fff"};
  color: ${({ theme }) => theme.text || "#000"};
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: ${({ theme }) => theme.accent || "#3b82f6"};
  }
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.button || "#3b82f6"};
  color: ${({ theme }) => theme.buttonText || "#fff"};
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;
