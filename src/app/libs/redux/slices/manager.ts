import { Category, GeneralResponse, Product } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

export interface State {
  currentProduct?: string;
  currentCategory?: string;
}

export const initialState: State = {};

const managerSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setProduct: (state, action: { payload: string | undefined }) => {
      state.currentProduct = action.payload;
    },
    setCategory: (state, action: { payload: string | undefined }) => {
      state.currentCategory = action.payload;
    },
  },
});

// Selectors
export const getProductData = (state: AppState) => {
  const responses = Object.values(state.productsApi.queries);
  const data = responses.shift()?.data as GeneralResponse<Product[]>;
  return data?.data?.find((item) => item._id === state.manager.currentProduct);
};

export const getCategoryData = (state: AppState) => {
  const responses = Object.values(state.categoriesApi.queries);
  const data = responses.shift()?.data as GeneralResponse<Category[]>;
  return data?.data?.find((item) => item._id === state.manager.currentCategory);
};

// Actions
export const { setProduct, setCategory } = managerSlice.actions;

export default managerSlice.reducer;
