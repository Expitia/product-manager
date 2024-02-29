import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

export interface State {
  errors: string[];
}

export const initialState: State = {
  errors: [],
};

const loggerSlice = createSlice({
  name: "error",
  initialState: initialState,
  reducers: {
    setError: (state, action: { payload: string }) => {
      state.errors.push(action.payload);
    },
  },
});

// Selectors
export const getError = (state: AppState) => {
  return state.logger.errors;
};

export const isLoading = (state: AppState): boolean => {
  const userMutations = Object.values(state.usersApi.mutations);
  const productQueries = Object.values(state.productsApi.queries);
  const categoryQueries = Object.values(state.categoriesApi.queries);
  const productMutations = Object.values(state.productsApi.mutations);
  const categoryMutations = Object.values(state.productsApi.mutations);
  const favoriteQuery = Object.values(state.favoritesApi.queries);
  const favoriteMutations = Object.values(state.favoritesApi.mutations);

  return (
    userMutations.some((item) => item?.status === "pending") ||
    productQueries.some((item) => item?.status === "pending") ||
    categoryQueries.some((item) => item?.status === "pending") ||
    productMutations.some((item) => item?.status === "pending") ||
    categoryMutations.some((item) => item?.status === "pending") ||
    favoriteQuery.some((item) => item?.status === "pending") ||
    favoriteMutations.some((item) => item?.status === "pending")
  );
};

// Actions
export const { setError } = loggerSlice.actions;

export default loggerSlice.reducer;
