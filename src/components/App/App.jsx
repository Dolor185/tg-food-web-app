import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { Header } from "../Header/Header";
import { Container } from "./App.styled";
import { SearchForm } from "../SearchForm/SearchForm";
import { ResultsTable } from "../ResultsTable/ResultsTable";
import { PersonalInfo } from "../PersonalInfo/PersonalInfo";
import { WelcomeModal } from "../welcomeModal/welcomeModal";
import axios from "axios";
export const App = () => {
  const { isSubmitted } = useContext(ProductContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false); 
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    const user = tg.initDataUnsafe?.user?.id; // Получаем ID пользователя
    const url = process.env.REACT_APP_URL;
    console.log(user);

    const  checkUser = async(user) => {
      const response = await axios.get(`${url}/first-open`, {
        params: {user},
      });
      if(response.data){
        setIsFirstVisit(true)
        setIsWelcomeModalOpen(true)
        return
      }
      return
    }
    checkUser(user)

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

  const closeWelcomeModal = () => {
    setIsWelcomeModalOpen(false);
    setIsFirstVisit(false); // Сброс состояния первого визита
  }

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
      {isFirstVisit && <WelcomeModal isOpen={isWelcomeModalOpen} onClose={closeWelcomeModal}/>}
    </Container>
  );
};
