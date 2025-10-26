import { baseApi } from "@/redux/api/baseApi";
import { TUserBuilderQueries } from "@/types/user";

interface GetTeamMemberParams {
    page?: number;
    role?: string;
    search?: String;
}

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getTeamMember: builder.query<TUserBuilderQueries, GetTeamMemberParams>({
            query: ({ role = "admin,manager,super", page = 1, search }) => ({
                url: `/user?page=${page}&role=${encodeURIComponent(role)}&search=${search}`,
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