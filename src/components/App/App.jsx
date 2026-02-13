import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ProductContext } from "../../context/ProductContext";
import { Header } from "../Header/Header";
import { Container } from "./App.styled";
import { SearchForm } from "../SearchForm/SearchForm";
import { ResultsTable } from "../ResultsTable/ResultsTable";
import { PersonalInfo } from "../PersonalInfo/PersonalInfo";
import { WelcomeModal } from "../welcomeModal/welcomeModal";
import axios from "axios";
import { SuggestedProducts } from "../SuggestedProducts/SuggestedProducts";

// ✅ ВАЖНО: импорт твоей общей модалки
import { Modal } from "../Modal/Modal";

export const App = () => {
  const { isSubmitted, isProductModalOpen, isProductModalClosing, closeProductModal, modalProduct } =
    useContext(ProductContext);

  const [isModalOpen, setIsModalOpen] = useState(false); // PersonalInfo
  const [isClosing, setIsClosing] = useState(false); // PersonalInfo

  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [suggested, setSuggested] = useState([]);

  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe?.user?.id;
  const url = process.env.REACT_APP_URL;

  const fetchSuggested = async () => {
    const response = await axios.get(`${url}/history`, {
      params: { userId: user },
    });

    const productMap = new Map();
    const treshold = 3;

    for (const entry of response.data.history) {
      const products = entry._doc?.products || entry.products;
      if (!Array.isArray(products)) continue;

      for (const product of products) {
        const key = `${product.name}|${product.metric_serving_unit}`;
        const count = productMap.get(key)?.count || 0;
        productMap.set(key, { ...product, count: count + 1 });
      }
    }

    const frequent = [...productMap.values()]
      .filter((p) => p.count >= treshold)
      .sort((a, b) => b.count - a.count);

    setSuggested(frequent);
  };

  useEffect(() => {
    fetchSuggested();

    const checkUser = async (user) => {
      const response = await axios.get(`${url}/first-open`, {
        params: { user },
      });
      if (response.data) {
        setIsFirstVisit(true);
        setIsWelcomeModalOpen(true);
      }
    };

    checkUser(user);

    tg.ready();
  }, [user]);

  // PersonalInfo modal
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
    setIsFirstVisit(false);
  };

  return (
    <Container>
      <Header onOpenModal={openModal} />

      <PersonalInfo isOpen={isModalOpen} isClosing={isClosing} onClose={closeModal} />

      <SearchForm />

      <SuggestedProducts products={suggested} />

      {isSubmitted && <ResultsTable />}

      {isFirstVisit && <WelcomeModal isOpen={isWelcomeModalOpen} onClose={closeWelcomeModal} />}

      {/* ✅ ОДНА ОБЩАЯ МОДАЛКА ПРОДУКТА ДЛЯ ЛИСТА И ДЛЯ СКАНЕРА */}
      <Modal
        isOpen={isProductModalOpen}
        isClosing={isProductModalClosing}
        onClose={closeProductModal}
        product={modalProduct}
      />

      <ToastContainer position="top-center" autoClose={2000} />
    </Container>
  );
};
