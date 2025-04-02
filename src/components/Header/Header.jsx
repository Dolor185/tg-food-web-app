import React from "react";
import { Button } from "./Header.styled";

export const Header = ({ onOpenModal }) => {
  const tg = window.Telegram.WebApp;

  return (
    <div>
      Welcome
      <span className="username"> {tg.initDataUnsafe?.user?.username}</span>
      <Button onClick={onOpenModal}>Personal Info</Button>
    </div>
  );
};
