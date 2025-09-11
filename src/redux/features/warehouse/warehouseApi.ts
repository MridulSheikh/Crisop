import { baseApi } from "@/redux/api/baseApi";
import { TWareHouseBuilderQueries } from "@/types/user";

const wareHouseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getWarehouse: builder.query<TWareHouseBuilderQueries, { [key: string]: string | any }>({
            query: () => ({
                url: `/warehouse`,
                method: "GET",
            }),
            providesTags: ["warehouse"],
        }),
        addWareHouse: builder.mutation({
            query: (body: any) => ({
                url: `/warehouse`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ["warehouse"]
        }),
        updateWareHouse: builder.mutation({
            query: ({ id, data }: { id: string, data: any }) =>({
                url: `/warehouse/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ["warehouse"]
        }),
        deleteWareHouse: builder.mutation({
           query: (id) =>({
            url:`/warehouse/${id}`,
            method: 'DELETE',
           }),
           invalidatesTags: ["warehouse"]
        })
    })
})

export const { useAddWareHouseMutation, useGetWarehouseQuery, useUpdateWareHouseMutation, useDeleteWareHouseMutation} = wareHouseApi;