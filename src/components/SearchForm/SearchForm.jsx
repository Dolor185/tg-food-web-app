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
import { FiCamera } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";

import { barcodeScan } from "../../hooks/barcodeScan";
import { getFoodById } from "../../hooks/getFoodById";
import { ModalBarcodeProduct } from "../BarcodeScanner/ModalBarcodeProduct";

export const SearchForm = () => {
  const { setProduct, setIsSubmitted, openProductModal } = useContext(ProductContext);

  const [localProduct, setLocalProduct] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const [isAddBarcodeModalOpen, setIsAddBarcodeModalOpen] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState("");

  const handleChange = (e) => setLocalProduct(e.target.value);

  const submitForm = (e) => {
    e.preventDefault();
    setProduct(localProduct);
    setIsSubmitted(true);
  };

  const handleBarcodeDetected = async (code) => {
    setIsScannerOpen(false);
    setScannedBarcode(code);

    try {
      const result = await barcodeScan(code);

      // ❌ не найдено нигде → показываем модалку добавления
      if (!result) {
        setIsAddBarcodeModalOpen(true);
        return;
      }

      // ✅ найден локальный → сразу открываем общую Modal
      if (result.type === "local") {
        openProductModal(result.food);
        return;
      }

      // ✅ найден fatsecret → тянем детали (чтобы были servings) и открываем Modal
      if (result.type === "fatsecret") {
        const data = await getFoodById(result.foodId);

        // на всякий случай: иногда бэк может вернуть {food: {...}}
        const fatProduct = data?.food || data;
        openProductModal(fatProduct);
        return;
      }

      // fallback
      setIsAddBarcodeModalOpen(true);
    } catch (e) {
      console.error("Barcode scan error:", e);
      setIsAddBarcodeModalOpen(true);
    }
  };

  return (
    <>
      <Form onSubmit={submitForm}>
        <Label>
          Write your meal
          <Input
            placeholder="Enter product name"
            onChange={handleChange}
            value={localProduct}
            type="text"
            title="Field may contain only latin letters"
            required
          />
        </Label>

        <Button type="submit">
          Search <CiSearch />
        </Button>

        <Button type="button" onClick={() => setIsScannerOpen(true)}>
          <FiCamera />
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

      {isAddBarcodeModalOpen && (
        <ModalBarcodeProduct
          barcode={scannedBarcode}
          handleClose={() => setIsAddBarcodeModalOpen(false)}
        />
      )}
    </>
  );
};
