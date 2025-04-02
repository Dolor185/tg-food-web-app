import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { Header } from "../Header/Header";
import { Container } from "./App.styled";
import { SearchForm } from "../SearchForm/SearchForm";
import { ResultsTable } from "../ResultsTable/ResultsTable";
import { PersonalInfo } from "../PersonalInfo/PersonalInfo";
import { WelcomeModal } from "../welcomeModal/welcomeModal";

export const App = () => {
  const { isSubmitted } = useContext(ProductContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  


  useEffect(() => {
    const url = process.env.REACT_APP_URL;
  const tg = window.Telegram.WebApp;

  const user = tg.initDataUnsafe?.user?.id;
    tg.ready();
    console.log("Telegram WebApp is ready");
    
  
    const checkFirstVisit = async () => {
      try {
        const response = await fetch(`${url}/first-open`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user }),
        });
        const data = await response.json();
        setIsFirstVisit(data.isFirstLogin);
      } catch (error) {
        console.error("Error fetching first login status:", error);
      }
    };
  
    checkFirstVisit();
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
      {isFirstVisit && <WelcomeModal onClose={() => setIsFirstVisit(false)} />}
    </Container>
  );
};
