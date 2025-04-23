import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from '../../styles/FormElements.styled';

export const History = ({ userId, onBack}) => {
  const [history, setHistory] = useState([]);
  const url = process.env.REACT_APP_URL;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${url}/history`, {
          params: { userId },
        });
        setHistory(res.data.history);
      } catch (err) {
        console.error("Ошибка при загрузке истории:", err);
      }
    };

    fetchHistory();
  }, [userId]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>История питания (последние 7 дней)</h2>
      {history.map((entry, index) => (
        <div
          key={index}
          style={{
            background: "#f9f9f9",
            padding: "12px",
            margin: "12px 0",
            borderRadius: "10px",
          }}
        >
          <strong>{new Date(entry.date).toLocaleDateString()}</strong>
          <p>Белки: {entry.total?.protein || 0} г</p>
          <p>Жиры: {entry.total?.fat || 0} г</p>
          <p>Углеводы: {entry.total?.carbs || 0} г</p>
          <p>Калории: {entry.total?.calories || 0} ккал</p>

          {entry.products?.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              <strong>Продукты:</strong>
              <ul style={{ paddingLeft: "18px", marginTop: "4px" }}>
                {entry.products.map((product, i) => (
                  <li key={i}>
                    {product.name} — {product.amount} {product.metric_serving_unit}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
      <Button type="button" onClick={onBack} style={{ marginLeft: '10px' }}>Назад</Button>
    </div>
  );
};
