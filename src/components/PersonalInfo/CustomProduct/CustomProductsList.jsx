import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CustomProductForm } from './CustomProductForm';
import { ModalCustom } from './ModalCustom';
import { ClipLoader } from "react-spinners"; 
import {ActionButton,List,ButtonRow,ListItem,Title,Container} from '../PersonalInfo.styled'
import { FiRefreshCcw } from 'react-icons/fi';


export const CustomProductsList = ({userId,onBack}) => {

  const url = process.env.REACT_APP_URL;

  const [products, setProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
  const fetchProducts = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(`${url}/custom-products`, {
        params: { userId: userId },
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching custom products:", error);
      toast.error("Failed to fetch custom products");
    }
    finally {
      setIsLoading(false);
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

  if(isLoading){
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <ClipLoader color="#40a7e3" size={40} />
      </div>
    );
  }

  return (
    <Container>
      <Title>My custom products</Title>
      <List>
        {products.map((product) => (
          <ListItem key={product._id} onClick={handleClick(product)}>
            {product.name} — {product.protein}g protein, {product.fat}g fat, {product.carbs}g carbs
            <ActionButton onClick={(e) =>  { e.stopPropagation(); handleDelete(product._id)}}>Delete</ActionButton>
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
        {isAdding ? "Cancel" : "Add "}
      </ActionButton>
      <ActionButton onClick={onBack}>Back</ActionButton>
      <ActionButton onClick={fetchProducts}> <FiRefreshCcw size={20} /></ActionButton>

      </ButtonRow>
    </Container>
  );
};
