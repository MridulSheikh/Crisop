import {baseApi} from "@/redux/api/baseApi";
import { TStock, TStockBuilderQueries } from "@/types/user";

const stockApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStock: builder.query<TStockBuilderQueries, {[key: string]: string | any}>({
            query: ()=> ({
                url: `/stock`,
                method: 'GET',
            }),
            providesTags: ["stocks"]
        }),
        addStocks: builder.mutation({
            query: (body: Omit<TStock, "_id" | "sku" | "isDeleted">) =>({
                url: '/stock',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['stocks']
        }),
        updateStocks: builder.mutation({
            query: ({id, data} : {id: string, data: any}) => ({
                url: `/stock/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['stocks']
        }),
        deleteStocks: builder.mutation({
            query: (id) => ({
                url: `/stock/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['stocks']
        })
    })
})


export const {useGetStockQuery, useAddStocksMutation, useDeleteStocksMutation, useUpdateStocksMutation} = stockApi;