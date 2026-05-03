"use client";
import ErrorUi from "@/components/shared/error/ErrorUi";
import LimitSelect from "@/components/shared/limitSelect/LimitSelect";
import { LoadingUi } from "@/components/shared/loadingui/LoadingUi";
import SearchInput from "@/components/shared/searchInput/SearchInput";
import AddTeamMemberModal from "@/components/ui/admin/team/AddTeamMember";
import TeamCard from "@/components/ui/admin/team/TeamCard";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import {
  useAddTeamMemeberMutation,
  useGetTeamMemberQuery,
} from "@/redux/features/user/userApi";
import { TUser } from "@/types/user";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const TeamPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // Roles state
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageNumber = Number(page) || 1;
   const limit = Number(searchParams.get("limit")) || 15;
  const { data, isLoading, error, isError } = useGetTeamMemberQuery(
    { page: pageNumber, search: searchQuery, limit : limit },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    },
  );

  const [AddTeamMember, { isLoading: isChangeRoleLoading }] =
    useAddTeamMemeberMutation();

  const teamMember = data?.data?.data;
  const meta = data?.data?.meta;

  // Team handlers
  const handleAddMember = async (data: { email: string; roleId: string }) => {
    const toastId = toast.loading("Updating...");
    try {
      await AddTeamMember({
        email: data.email,
        role: data.roleId,
      }).unwrap();
      toast.update(toastId, {
        render: "Successfully add team member",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        position: "top-center",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.update(toastId, {
        render: err?.data?.errorMessage ?? "something went wrong",
        type: "error",
        isLoading: false,
        autoClose: 4000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="px-6 py-3 lg:flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Team</h1>
        <div className=" flex flex-col lg:flex-row gap-2 mt-5 lg:mt-0 lg:gap-4 lg:items-center">
          <div className="flex gap-x-3">
            <div>
              <LimitSelect />
            </div>

            <div className="flex">
              <SearchInput
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="🔍 Search Team Member by Name or Email"
              />
            </div>
          </div>

          <AddTeamMemberModal
            roles={["admin", "manager"]}
            onAdd={handleAddMember}
            isLoading={isChangeRoleLoading}
          />
        </div>
      </div>
      <div className="flex p-6 flex-col  gap-8">
        {/* Team Members */}
        <section className="flex-1">
          <div className=" overflow-x-scroll">
            <table className="min-w-full shadow-md bg-white rounded-md overflow-hidden text-left text-sm">
              <thead className="bg-black text-white">
                <tr>
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Email</th>
                  <th className="p-3 border-b">Role</th>
                  <th className="p-3 border-b text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamMember?.map((member: TUser) => (
                  <TeamCard member={member} key={member._id} />
                ))}
                {teamMember?.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-gray-500">
                      No team members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {isError && <ErrorUi error={error} />}
            {isLoading && <LoadingUi />}
          </div>
          {!isLoading && (
            <div className="mt-5">
              <PaginationWithLinks
                page={meta?.page as number}
                pageSize={meta?.limit as number}
                totalCount={meta?.total as number}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TeamPage;
