import axios from "axios";

export const fetchProducts = () =>
  axios.get("https://68da3fef23ebc87faa2f73d6.mockapi.io/food-api");
