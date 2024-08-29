import axios from "axios";
import { gjdeicf25xoyjhwyqirf6c2o } from "@env";

const apiClient = axios.create({
  baseURL: "https://openapi.etsy.com/v3/application",
  headers: {
    "x-api-key": gjdeicf25xoyjhwyqirf6c2o,
  },
});

export const fetchProducts = async (query) => {
  try {
    const response = await apiClient.get(`/listings/active`, {
      params: {
        keywords: query,
        limit: 10,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching products from Etsy API:", error);
    return [];
  }
};
