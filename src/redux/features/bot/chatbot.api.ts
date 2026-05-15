import { baseApi } from "@/redux/api/baseApi";

export const chatBotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    sendMessage: builder.mutation({
      query: (body: { message: string; inboxId?: string }) => {
        return {
          url: "/chatBot",
          method: "POST",
          body,
        };
      },
    }),

  }),
  overrideExisting: false,
});

export const {
  useSendMessageMutation,
} = chatBotApi;