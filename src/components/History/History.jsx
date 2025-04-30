import React, { useEffect, useState } from "react";
import axios from "axios";
import {ActionButton,List,ListItem,Title,Container} from '../PersonalInfo/PersonalInfo.styled'
import { ClipLoader } from "react-spinners";
import { FiRefreshCcw } from 'react-icons/fi';

export const History = ({ userId, onBack}) => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_URL;

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${url}/history`, {
        params: { userId },
      });
      setHistory(res.data.history);

    } catch (err) {
      console.error("Ошибка при загрузке истории:", err);
    }
    finally {
      setIsLoading(false); // Всегда выключать загрузку
    }
  };

  useEffect(() => {
  

    fetchHistory();
  }, [userId]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
  <ClipLoader color="#40a7e3" size={40} />
</div>
    );
  }


  return (

    <Container style={{ marginTop: "20px" }}>
    <ActionButton onClick={fetchHistory}> <FiRefreshCcw size={20} /></ActionButton>
      <h2>History of nutrition (last 7 days)</h2>
      {history.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>No nutritional data for the last 7 days.</p>
        </div>
      )}
      {history.map((entry, index) => (
        <Container
          key={index}
        >
          <Title>{new Date(entry.date).toLocaleDateString()}</Title>
          <p>Proteins: {entry.total?.protein || 0} g</p>
          <p>Fats: {entry.total?.fat || 0} g</p>
          <p>Carbs: {entry.total?.carbs || 0} g</p>
          <p>Calories: {entry.total?.calories || 0} kcal</p>

          {entry.products?.length > 0 && (
            <Container style={{ marginTop: "10px" }}>
 
              <Title>Products:</Title>
              <List >
                {entry.products.map((product, i) => (
                  <ListItem key={i}>
                    {product.name} — {product.amount} {product.metric_serving_unit}
                  </ListItem>
                ))}
              </List>
            </Container>
          )}
        </Container>
      ))}
      <ActionButton type="button" onClick={onBack} style={{ marginLeft: '10px' }}>Back</ActionButton>
    </Container>
  );
};
