import React, { useEffect, useState } from "react";
import axios from "axios";
import {ActionButton,List,ListItem,Title,Container} from '../PersonalInfo/PersonalInfo.styled'
import { ClipLoader } from "react-spinners";

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
    <ActionButton onClick={fetchHistory}>Обновить</ActionButton>
      <h2>История питания (последние 7 дней)</h2>
      {history.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>Нет данных о питании за последние 7 дней.</p>
        </div>
      )}
      {history.map((entry, index) => (
        <Container
          key={index}
        >
          <Title>{new Date(entry.date).toLocaleDateString()}</Title>
          <p>Белки: {entry.total?.protein || 0} г</p>
          <p>Жиры: {entry.total?.fat || 0} г</p>
          <p>Углеводы: {entry.total?.carbs || 0} г</p>
          <p>Калории: {entry.total?.calories || 0} ккал</p>

          {entry.products?.length > 0 && (
            <Container style={{ marginTop: "10px" }}>
 
              <Title>Продукты:</Title>
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
      <ActionButton type="button" onClick={onBack} style={{ marginLeft: '10px' }}>Назад</ActionButton>
    </Container>
  );
};
