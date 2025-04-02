import axios from "axios";

const url = process.env.REACT_APP_URL;

export const barcodeScan = (code) => {
  try {
    const response = axios.get(`${url}/getByBarcode?barcode=${code}`);
    if (response.data) {
      return response.data.food_id.value;
    }
  } catch (error) {
    console.log("Error scanning barcode:", error.message);

    return [];
  }
};
