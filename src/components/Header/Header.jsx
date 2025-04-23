import React from "react";
import { Button, HeaderDiv } from "./Header.styled";

export const Header = ({ onOpenModal }) => {
  const tg = window.Telegram.WebApp;

  return (
    <HeaderDiv>
      <span className="username">Welcome {tg.initDataUnsafe?.user?.username}</span>
      <Button onClick={onOpenModal}>Personal Info</Button>
    </HeaderDiv>
  );
};