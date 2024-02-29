import {
    GeneralResponse,
    ServerRegister
} from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const usersApi = createApi({
  reducerPath: "usersApi",
  keepUnusedDataFor: 0,
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    register: builder.mutation<GeneralResponse, ServerRegister>({
      query: (user) => ({
        url: "/users",
        method: "post",
        body: user,
      }),
    }),
  }),
});

export const { useRegisterMutation } = usersApi;

export default usersApi;
