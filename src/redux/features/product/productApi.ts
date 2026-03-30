import { baseApi } from "@/redux/api/baseApi";
import { TProductBuilderQueries } from "@/types/user";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<TProductBuilderQueries, { page?: number; search?: string; limit?: number }>({
      query: ({ page = 1, search = "", limit = 10 }) => {
        // Query parameters build
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (search) params.append("searchTerm", search);
        return {
          url: `/product?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["products"], // optional: cache invalidation
    }),
  }),
});

export const { useGetProductQuery } = productApi;