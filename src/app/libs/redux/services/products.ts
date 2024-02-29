import { GeneralResponse, Product, ServerProduct } from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
  reducerPath: "productsApi",
  keepUnusedDataFor: 0,
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<GeneralResponse<Product[]>, string>({
      query: (text) => `/products/?text=${encodeURI(text)}`,
      forceRefetch: () => true,
    }),
    deleteProduct: builder.mutation<GeneralResponse, string>({
      query: (id) => ({
        url: `/products/?id=${id}`,
        method: "delete",
      }),
    }),
    assignProduct: builder.mutation<GeneralResponse, ServerProduct>({
      query: (product) => ({
        url: "/products",
        method: "put",
        body: {
          id: product.id,
          categoryId: product.categoryId,
        },
      }),
    }),
    updateProduct: builder.mutation<GeneralResponse, ServerProduct>({
      query: (product) => ({
        url: "/products",
        method: "put",
        body: product,
      }),
    }),
    createProduct: builder.mutation<GeneralResponse, ServerProduct>({
      query: (product) => ({
        url: "/products",
        method: "post",
        body: product,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAssignProductMutation,
} = productsApi;

export default productsApi;
