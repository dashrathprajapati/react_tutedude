import axios from "axios";

export const fetchProducts = () =>
  axios.get("https://fakestoreapi.com/products?limit=16");