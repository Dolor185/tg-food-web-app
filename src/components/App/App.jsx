import React, { useContext, useEffect } from "react";
import { ProductContext } from "../../context/ProductContext";
import { Header } from "../Header/Header";
import { Container } from "./App.styled";
import { SearchForm } from "../SearchForm/SearchForm";
import { ResultsTable } from "../ResultsTable/ResultsTable";

export const App = () => {
  const { isSubmitted } = useContext(ProductContext);
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    console.log("Telegram WebApp is ready");
  }, []);

  return (
    <Container>
      <Header />
      <SearchForm></SearchForm>
      {isSubmitted && <ResultsTable />}
    </Container>
  );
};
