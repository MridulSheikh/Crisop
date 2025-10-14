import { baseApi } from "@/redux/api/baseApi";
import { TUserBuilderQueries } from "@/types/user";

interface GetTeamMemberParams {
    page?: number;
    role?: string;
}

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getTeamMember: builder.query<TUserBuilderQueries, GetTeamMemberParams>({
            query: ({ role = "admin,manager,super", page = 1 }) => ({
                url: `/user?page=${page}&role=${encodeURIComponent(role)}`,
                method: "GET",
            }),
            providesTags: ["users"],
        }),
        addTeamMemeber: builder.mutation({
            query: (data) => ({
                url: "/user/add-member",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["users"]
        }),
        changeUserRole: builder.mutation({
            query: (data) => ({
                url: "/user/change-role",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["users"]
        }),
    })
})


export const { useGetTeamMemberQuery, useAddTeamMemeberMutation, useChangeUserRoleMutation } = userApi