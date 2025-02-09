import { useState, useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import {
  Form,
  Label,
  Input,
  Button,
  ScannerOverlay,
  ScannerContainer,
  CloseButton,
} from "./SearchForm.styled";
import { BarcodeScanner } from "../BarcodeScanner/BarcodeScanner";
import { barcodeScan } from "../../hooks/barcodeScan";
import { getFoodById } from "../../hooks/getFoodById";

export const SearchForm = () => {
  const { setProduct, setIsSubmitted } = useContext(ProductContext);
  const [localProduct, setLocalProduct] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleChange = (e) => {
    setLocalProduct(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    setProduct(localProduct);
    setIsSubmitted(true);
  };
  const handleBarcodeDetected = (code) => {
    setIsScannerOpen(false);
    const foodId = barcodeScan(code);

    const food = getFoodById(foodId);

    setProduct(food);
  };

  return (
    <>
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
        <Button type="button" onClick={() => setIsScannerOpen(true)}>
          Scan Barcode
        </Button>
      </Form>
      {isScannerOpen && (
        <ScannerOverlay>
          <ScannerContainer>
            <BarcodeScanner onDetected={handleBarcodeDetected} />
            <CloseButton type="button" onClick={() => setIsScannerOpen(false)}>
              Close Scanner
            </CloseButton>
          </ScannerContainer>
        </ScannerOverlay>
      )}
    </>
  );
};
