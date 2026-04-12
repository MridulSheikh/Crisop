import { baseApi } from "@/redux/api/baseApi";
import { TProductBuilderQueries } from "@/types/user";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET PRODUCTS
    getProduct: builder.query<
      TProductBuilderQueries,
      { page?: number; search?: string; limit?: number }
    >({
      query: ({ page = 1, search = "", limit = 10 }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (search) params.append("searchTerm", search);

        return {
          url: `/product?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["products"],
    }),

    // CREATE PRODUCT (MUTATION)
    createProduct: builder.mutation({
      query: (data: FormData) => {
        console.log([...data.entries()]);
        return {
          url: "/product",
          method: "POST",
          body: data, 
        };
      },
      invalidatesTags: ["products"], // auto refetch list
    }),
  }),
});

export const {
  useGetProductQuery,
  useCreateProductMutation,
} = productApi;