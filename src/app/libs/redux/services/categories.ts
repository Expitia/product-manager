import { Category, GeneralResponse, ServerCategory } from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  keepUnusedDataFor: 0,
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getCategories: builder.query<GeneralResponse<Category[]>, string>({
      query: (text) => `/categories/?text=${encodeURI(text)}`,
      forceRefetch: () => true,
    }),
    deleteCategory: builder.mutation<GeneralResponse, string>({
      query: (id) => ({
        url: `/categories/?id=${id}`,
        method: "delete",
      }),
    }),
    updateCategory: builder.mutation<GeneralResponse, ServerCategory>({
      query: (category) => ({
        url: "/categories",
        method: "put",
        body: category,
      }),
    }),
    createCategory: builder.mutation<GeneralResponse, ServerCategory>({
      query: (category) => ({
        url: "/categories",
        method: "post",
        body: category,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;

export default categoriesApi;
