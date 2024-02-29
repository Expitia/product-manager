import {
    Favorite,
    GeneralResponse,
    ServerProductUser,
    ServerUserSearch,
} from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  keepUnusedDataFor: 0,
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getFavorite: builder.query<GeneralResponse<Favorite[]>, ServerUserSearch>({
      query: ({ text, id }) => `/favorites/?text=${encodeURI(text)}&id=${id}`,
      forceRefetch: () => true,
    }),
    deletFavorite: builder.mutation<GeneralResponse, string>({
      query: (id) => ({
        url: `/favorites/?id=${id}`,
        method: "delete",
      }),
    }),
    addFavorite: builder.mutation<GeneralResponse, ServerProductUser>({
      query: (favorite) => ({
        url: `/favorites/`,
        method: "post",
        body: favorite,
      }),
    }),
  }),
});

export const {
  useGetFavoriteQuery,
  useAddFavoriteMutation,
  useDeletFavoriteMutation,
} = favoritesApi;

export default favoritesApi;
