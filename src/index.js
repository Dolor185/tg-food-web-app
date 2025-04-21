import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App/App";
import { ProductProvider } from "./context/ProductContext";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
const tg = window.Telegram.WebApp;
tg.ready();

root.render(
  
    <React.StrictMode>
    <ProductProvider>
    <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>

    </ProductProvider>
  </React.StrictMode>

);
