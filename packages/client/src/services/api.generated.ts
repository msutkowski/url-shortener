import { createApi } from "@reduxjs/toolkit/query/react";
import { default as customBaseQuery } from "./baseQuery";
export const api = createApi({
  baseQuery: customBaseQuery,
  tagTypes: [],
  endpoints: (build) => ({
    createLink: build.mutation<CreateLinkApiResponse, CreateLinkApiArg>({
      query: (queryArg) => ({
        url: `/generate`,
        method: "POST",
        body: queryArg.createLinkRequest,
      }),
    }),
    readLink: build.query<ReadLinkApiResponse, ReadLinkApiArg>({
      query: () => ({ url: `/check` }),
    }),
    findLinkAndRedirect: build.query<
      FindLinkAndRedirectApiResponse,
      FindLinkAndRedirectApiArg
    >({
      query: (queryArg) => ({ url: `/${queryArg.hash}` }),
    }),
  }),
});
export type CreateLinkApiResponse = /** status 200 The new resource */ Link;
export type CreateLinkApiArg = {
  createLinkRequest: CreateLinkRequest;
};
export type ReadLinkApiResponse =
  /** status 200 Returns a permanent redirect */ Link;
export type ReadLinkApiArg = {};
export type FindLinkAndRedirectApiResponse = unknown;
export type FindLinkAndRedirectApiArg = {
  hash: string;
};
export type Link = {
  id: number;
  long_url: string;
  hash: string;
  link: string;
};
export type CreateLinkRequest = {
  long_url: string;
};
export const {
  useCreateLinkMutation,
  useReadLinkQuery,
  useFindLinkAndRedirectQuery,
} = api;
