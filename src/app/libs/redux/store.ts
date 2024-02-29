import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { rtkQueryErrorLogger } from "./middleware/rtkQueryErrorLogger";
import carsApi from "./services/cars";
import categoriesApi from "./services/categories";
import favoritesApi from "./services/favorites";
import productsApi from "./services/products";
import usersApi from "./services/users";
import loggerSlice from "./slices/logger";
import managerReducer from "./slices/manager";

const reducer = combineReducers({
  logger: loggerSlice,
  manager: managerReducer,
  [carsApi.reducerPath]: carsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [favoritesApi.reducerPath]: favoritesApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      carsApi.middleware,
      usersApi.middleware,
      productsApi.middleware,
      favoritesApi.middleware,
      categoriesApi.middleware,
      rtkQueryErrorLogger
    ),
});

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore["getState"]>;

export default store;
