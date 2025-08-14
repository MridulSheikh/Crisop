import { TUserBuilderQueries } from "@/types/user";
import { baseApi } from "../../api/baseApi";

type TResponseUser = {
   data: {
    accessToken: string,
   },
   message: string,
   statusCode: number,
   status: boolean
};

type ToAuthLoginPayload = {
   accessToken: string,
   method: string
};

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getTeamMember: builder.query<TUserBuilderQueries, { [key: string]: string | any }>({
      query: () =>({
        url: `/user?role=admin,manager`,
        method: "GET",
      }),
      providesTags: ['user']
    }),
    signupUser: builder.mutation({
      query: (data) => ({
        url: "/user/create",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),
    OauthLogin: builder.mutation<TResponseUser, ToAuthLoginPayload>({
      query: (data) => ({
        url: "/user/oauth",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/user/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/user/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    verfiyEmail: builder.mutation({
      query: (data) => ({
        url: `/user/verify`,
        method: "POST",
        body: data
      })
    }),
    changeUserRole: builder.mutation({
      query: (data) => ({
        url: "/user/change-role",
        method: "POST",
        body: data
      })
    })
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useOauthLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation, 
  useVerfiyEmailMutation,
  useChangeUserRoleMutation,
  useGetTeamMemberQuery
} = authApi;