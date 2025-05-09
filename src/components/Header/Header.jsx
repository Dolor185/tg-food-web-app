import React from "react";
import { Button, HeaderDiv } from "./Header.styled";
import { FiUser } from "react-icons/fi";

export const Header = ({ onOpenModal }) => {
  const tg = window.Telegram.WebApp;

  return (
    <HeaderDiv>
      <span className="username">Welcome {tg.initDataUnsafe?.user?.username}</span>
      <Button onClick={onOpenModal}><FiUser />
      </Button>
    </HeaderDiv>
  );
};