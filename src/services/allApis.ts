import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./api";

export const allApis = createApi({
  reducerPath: "allApi",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["Property"],
  endpoints: (_builder) => ({}),
});
