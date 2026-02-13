import { createContext, useCallback, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // ✅ это оставляем как было: строка поиска + флаг показа ResultsTable
  const [product, setProduct] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ✅ новое: состояние общей модалки продукта
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isProductModalClosing, setIsProductModalClosing] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  const openProductModal = useCallback((p) => {
    setModalProduct(p);
    setIsProductModalClosing(false);
    setIsProductModalOpen(true);
  }, []);

  const closeProductModal = useCallback(() => {
    setIsProductModalClosing(true);
    setTimeout(() => {
      setIsProductModalOpen(false);
      setIsProductModalClosing(false);
      setModalProduct(null);
    }, 300);
  }, []);

  return (
    <ProductContext.Provider
      value={{
        product,
        setProduct,
        isSubmitted,
        setIsSubmitted,

        // modal controls
        isProductModalOpen,
        isProductModalClosing,
        modalProduct,
        openProductModal,
        closeProductModal,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
