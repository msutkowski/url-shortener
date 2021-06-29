import { api as generatedApi } from "./api.generated";
import type { ReadLinkApiResponse } from "./api.generated";

// This is in place assuming there is a view built in the future that allows for Read/Update/Delete
// If we enabled link editing or any type of 'admin view', we'd be able to implement robust caching features very quickly.
export const enhancedApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["Link"],
  endpoints: {
    createLink: {
      invalidatesTags: (result, _error, _arg) =>
        result ? [{ type: "Link", id: result.hash }] : [],
    },
  },
});

export const api = enhancedApi.injectEndpoints({
  endpoints: (build) => ({
    // This is a little hacky, but necessary. This is the easiest way for us to check a link
    // and have access to the entity immediately in order to redirect.
    checkCode: build.mutation<ReadLinkApiResponse, string>({
      query: (hash) => `/check?hash=${hash}`,
    }),
  }),
  overrideExisting: false,
});

export const { useCreateLinkMutation, useCheckCodeMutation } = api;
