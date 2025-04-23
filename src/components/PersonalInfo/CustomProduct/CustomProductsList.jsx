import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const CustomProductsList = () => {
  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe?.user?.id;
  const url = process.env.REACT_APP_URL;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${url}/custom-products`, {
          params: { userId: user },
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching custom products:", error);
        toast.error("Failed to fetch custom products");
      }
    };

    fetchProducts();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/delete-custom`, {
        data: { userId: user, productId: id },
      });
      setProducts(prev => prev.filter(p => p._id !== id));
      toast.success("Product deleted!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div>
      <h2>Мои кастомные продукты</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} — {product.protein}г белка, {product.fat}г жира, {product.carbs}г углеводов
            <button onClick={() => handleDelete(product._id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
