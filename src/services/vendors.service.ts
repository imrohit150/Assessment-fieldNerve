import axios from "axios";
import { venders } from "../constants";

export const getVendors = async (page: number, limit: number, sortBy: string, order: string, status: string, search: string) => {
  try {
    const response = await axios.get(venders(page, limit, sortBy, order, status, search));
    return response.data;
  } catch (error) {
    console.error("Error fetching vendors:", error);
    throw error;
  }
};