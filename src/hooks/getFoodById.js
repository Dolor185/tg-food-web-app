import axios from "axios";

const url = process.env.REACT_APP_URL;

export const getFoodById = async (id) => {
  const res = await axios.get(`${url}/food-details`, { params: { id } });
  return res.data;
};
