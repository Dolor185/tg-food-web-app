import styled from "styled-components";

export const Ul = styled.ul`
  padding: var(--tg-safe-area-inset-top);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 5px;
    font-size: 12px;
  }
`;
