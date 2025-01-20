import React, { useEffect, useState } from "react";
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  Product,
} from "./PersonalInfo.styled";
import axios from "axios";
import { NutrientBars } from "../NutrientsBars/NutrientsBars";
export const PersonalInfo = ({ isOpen, isClosing, onClose }) => {
  if (!isOpen) return null;
  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe?.user?.id;

  // const url = process.env.URL;

  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!isOpen) return;

    const getData = async () => {
      try {
        const response = await axios.get(
          `https://tgfood-production.up.railway.app/check-nutrients`,
          {
            params: { user },
          }
        );
        setData(response.data[0].totalNutrients);
        setProducts(response.data[0].products);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    getData();
  }, [isOpen, user]);

  if (data) {
    console.log(data);
  }

  // const deleteProduct = async (id) => {
  //   try {
  //     await axios.delete("http://localhost:3000/delete-product", {
  //       params: { id },
  //     });
  //   } catch (error) {
  //     console.error("Ошибка при удалении продукта:", error);
  //   }
  // };

  return (
    <>
      <ModalOverlay $isClosing={isClosing} onClick={onClose} />
      <ModalContent $isClosing={isClosing}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>Header Modal</h2>
        <p>This is a modal from the Header component</p>
        <p>{data && <NutrientBars data={data} />}</p>

        {products.length > 0 &&
          products.map((product) => (
            <Product key={product.id}>
              <p>{product.name}</p>
              <p>{product.amount}g</p>
              <button
                onClick={async () => {
                  try {
                    await axios.delete(
                      `https://tgfood-production.up.railway.app/delete-product`,
                      {
                        params: { productId: product.id, user },
                      }
                    );
                  } catch (error) {
                    console.error("Ошибка при удалении продукта:", error);
                  }
                }}
              >
                delete
              </button>
            </Product>
          ))}
      </ModalContent>
    </>
  );
};
