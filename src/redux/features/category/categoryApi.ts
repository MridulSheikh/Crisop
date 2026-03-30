import { baseApi } from "@/redux/api/baseApi";
import { TCategory, TCategoryQueryBuilder } from "@/types/user";



const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getCategory: builder.query<TCategoryQueryBuilder, {[key: string]: string | any }>({
            query: ({page =1, search, limit})=>({
                url: `/category?page=${page}&limit=${limit}${search ? `&searchTerm=${search}`: ""}`,
                 method: 'GET',
            }),
            providesTags: ["categories"]
        }),
        addCategory: builder.mutation({
            query: (body: Omit<TCategory, "_id" | "isDeleted">) => ({
                url: '/category',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['categories']
        })
    }),
})

export const {useGetCategoryQuery, useAddCategoryMutation} = categoryApi;