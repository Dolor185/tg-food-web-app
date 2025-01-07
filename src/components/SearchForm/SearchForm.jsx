import { useState, useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
export const SearchForm = () => {
  const { setProduct, setIsSubmitted } = useContext(ProductContext);
  const [localProduct, setLocalProduct] = useState("");
  const handleChange = (e) => {
    setLocalProduct(e.target.value);
  };
  const submitForm = (e) => {
    e.preventDefault();
    setProduct(localProduct);
    setIsSubmitted(true);
  };
  return (
    <form onSubmit={submitForm}>
      <label>
        Product
        <input
          onChange={handleChange}
          value={localProduct}
          type="text"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
};
