import React from "react";

export const Header = () => {
  const tg = window.Telegram.WebApp;
  // console.log(tg);

  return (
    <div>
      Добро пожаловать
      <span className="username"> {tg.initDataUnsafe?.user?.username}</span>
    </div>
  );
};
