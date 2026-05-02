import { baseApi } from "@/redux/api/baseApi";
import { TProduct } from "@/types/user";

// types

export type TOrderItem <P> = {
  product: P;
  quantity: number;
  price: number;
  discountPrice?: number;
};

export type TOrder <P> = {
  orderId?: string;
  _id: string;
  customer: string;
  shippingInfo: {
    addressOneLine: string;
    type: "Standard" | "24h" | "3d";
    contact: string;
    email: string;
  };
  items: TOrderItem<P>[];
  status: "pending" | "packing" | "shipped" | "delivered";
  isCancel: boolean;
  isCod: boolean;
  isPaymentComplete: boolean;
  createdAt: string;
  total: number;
};

export type TGetMyOrderQuery ={
    data: TOrder<TProduct>[];
}

// Api

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // REATE ORDER
    postOrderUser: builder.mutation<
      { success: boolean; data: TOrder<string> },
      Partial<TOrder<string>>
    >({
      query: (data) => ({
        url: "/order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),

    // GET MY ORDERS
    getMyOrders: builder.query<TGetMyOrderQuery, void>({
      query: () => ({
        url: `/order/my-orders`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),

    // GET SINGLE ORDER
    getSingleOrder: builder.query<TOrder<TProduct>, string>({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),

    // UPDATE ORDER STATUS (ADMIN)
    updateOrderStatus: builder.mutation<
      { success: boolean },
      { id: string; status: TOrder<string>["status"] }
    >({
      query: ({ id, status }) => ({
        url: `/order/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["order"],
    }),

    // CANCEL ORDER
    cancelOrder: builder.mutation<
      { success: boolean },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/order/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["order"],
    }),
    // GET ALL ORDER
    
  }),

  overrideExisting: false,
});

export const {
  usePostOrderUserMutation,
  useGetMyOrdersQuery,
  useGetSingleOrderQuery,
  useUpdateOrderStatusMutation,
  useCancelOrderMutation,
} = orderApi;