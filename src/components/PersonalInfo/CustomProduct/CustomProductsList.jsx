import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CustomProductForm } from './CustomProductForm';
import { ModalCustom } from './ModalCustom';

import {ActionButton,List,ButtonRow,ListItem,Title,Container} from '../PersonalInfo.styled'

export const CustomProductsList = ({userId,onBack}) => {

  const url = process.env.REACT_APP_URL;

  const [products, setProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${url}/custom-products`, {
        params: { userId: userId },
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching custom products:", error);
      toast.error("Failed to fetch custom products");
    }
  };

  useEffect(() => {
    

    fetchProducts();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/delete-custom`, {
        data: { userId: userId, productId: id },
      });
      setProducts(prev => prev.filter(p => p._id !== id));
      toast.success("Product deleted!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const handleClick = (product) => () => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Container>
      <Title>Мои кастомные продукты</Title>
      <List>
        {products.map((product) => (
          <ListItem key={product._id} onClick={handleClick(product)}>
            {product.name} — {product.protein}г белка, {product.fat}г жира, {product.carbs}г углеводов
            <ActionButton onClick={(e) =>  { e.stopPropagation(); handleDelete(product._id)}}>Удалить</ActionButton>
          </ListItem>

        ))}
      </List>
      {isModalOpen && <ModalCustom product={selectedProduct} onClose={handleCloseModal} userId={userId}/>}

      {isAdding && (
  <CustomProductForm
    userId={userId}
    onSuccess={() => {
      setIsAdding(false);
      fetchProducts(); // обновить после добавления
    }}
  />
)}
<ButtonRow>
      <ActionButton onClick={() => setIsAdding(!isAdding)}>
        {isAdding ? "Отмена" : "Добавить продукт"}
      </ActionButton>
      <ActionButton onClick={onBack}>Назад</ActionButton>
      </ButtonRow>
    </Container>
  );
};
