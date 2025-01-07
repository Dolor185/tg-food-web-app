import { useState, useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { Form, Label, Input, Button } from "./SearchForm.styled";

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
    <Form onSubmit={submitForm}>
      <Label>
        Write your meal
        <Input
          onChange={handleChange}
          value={localProduct}
          type="text"
          title="Field may contain only latin letters"
          required
        />
      </Label>
      <Button type="submit">Search</Button>
    </Form>
  );
};
