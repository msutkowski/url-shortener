import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const { API_URL = "http://localhost:5679" } = process.env;

// We export this because we want to be able to pull the API_URL dynamically. Especially helpful
// when setting different API_URL's in various environments
export const baseQuery = fetchBaseQuery({
  baseUrl: String(API_URL),
});

export default baseQuery;