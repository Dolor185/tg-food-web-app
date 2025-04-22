import React, { useEffect, useState } from "react";
import axios from "axios";

export const History = ({ userId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/history`, {
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
        <div key={index} style={{
          background: "#f9f9f9",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "10px",
        }}>
          <strong>{new Date(entry.date).toLocaleDateString()}</strong>
          <p>Белки: {entry.total.protein} г</p>
          <p>Жиры: {entry.total.fat} г</p>
          <p>Углеводы: {entry.total.carbs} г</p>
          <p>Калории: {entry.total.calories} ккал</p>
        </div>
      ))}
    </div>
  );
};

