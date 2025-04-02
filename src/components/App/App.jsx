import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { Header } from "../Header/Header";
import { Container } from "./App.styled";
import { SearchForm } from "../SearchForm/SearchForm";
import { ResultsTable } from "../ResultsTable/ResultsTable";
import { PersonalInfo } from "../PersonalInfo/PersonalInfo";

export const App = () => {
  const { isSubmitted } = useContext(ProductContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    console.log("Telegram WebApp is ready");
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setIsModalOpen(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <Container>
      <Header onOpenModal={openModal} />
      <PersonalInfo
        isOpen={isModalOpen}
        isClosing={isClosing}
        onClose={closeModal}
      />
      <SearchForm></SearchForm>
      {isSubmitted && <ResultsTable />}
    </Container>
  );
};
