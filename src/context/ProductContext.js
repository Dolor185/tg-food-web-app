import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <ProductContext.Provider
      value={{ product, setProduct, isSubmitted, setIsSubmitted }}
    >
      {children}
    </ProductContext.Provider>
  );
};
