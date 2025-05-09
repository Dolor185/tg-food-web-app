import styled from "styled-components";
export const Button = styled.button`
  width: 38px;
  height: 38px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  font-size: 1rem;
  font-weight: bold;
  background: var(--tg-theme-bg-color);
  color: #FFFFFF;
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

export const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 100%; 
  background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
  font-weight: 600;
`;