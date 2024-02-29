import {
    CarProduct,
    GeneralResponse,
    ServerProductUser,
    ServerUserSearch,
} from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const carsApi = createApi({
  reducerPath: "carsApi",
  keepUnusedDataFor: 0,
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getCar: builder.query<GeneralResponse<CarProduct[]>, ServerUserSearch>({
      query: ({ text, id }) => `/cars/?text=${encodeURI(text)}&id=${id}`,
      forceRefetch: () => true,
    }),
    deleteCarProduct: builder.mutation<GeneralResponse, string>({
      query: (id) => ({
        url: `/cars/?id=${id}`,
        method: "delete",
      }),
    }),
    addCarProduct: builder.mutation<GeneralResponse, ServerProductUser>({
      query: (favorite) => ({
        url: `/cars/`,
        method: "post",
        body: favorite,
      }),
    }),
  }),
});

export const {
  useGetCarQuery,
  useAddCarProductMutation,
  useDeleteCarProductMutation,
} = carsApi;

export default carsApi;
