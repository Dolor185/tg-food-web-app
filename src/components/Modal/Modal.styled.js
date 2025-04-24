import styled from "styled-components";




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
