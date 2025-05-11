export const SuggestedProducts = ({ products }) => {
    if (!products || products.length === 0) return null;
  
    return (
      <div style={{ marginTop: "20px" }}>
        <h2>Часто используемые продукты</h2>
        <div>
          {products.map((product, index) => (
            <div
              key={index}
              style={{
                margin: "10px 0",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                background: "var(--tg-theme-secondary-bg-color)",
                color: "var(--tg-theme-text-color)",
              }}
            >
              <strong>{product.name}</strong>
              <div style={{ fontSize: "0.9rem", marginTop: "4px" }}>
                <span>Единица: {product.metric_serving_unit}</span>
                <br />
                <span>Использовался: {product.count} раз</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  