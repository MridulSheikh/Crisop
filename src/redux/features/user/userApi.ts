import { baseApi } from "@/redux/api/baseApi";
import { TUserBuilderQueries } from "@/types/user";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getTeamMember: builder.query<TUserBuilderQueries, { [key: string]: string | any }>({
            query: () => ({
                url: `/user?role=admin,manager,super`,
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


export const { useGetTeamMemberQuery, useAddTeamMemeberMutation, useChangeUserRoleMutation} = userApi