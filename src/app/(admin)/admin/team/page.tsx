"use client";
import AddTeamMemberModal from "@/components/ui/admin/team/AddTeamMember";
import TeamCard from "@/components/ui/admin/team/TeamCard";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import {
  useAddTeamMemeberMutation,
  useGetTeamMemberQuery,
} from "@/redux/features/user/userApi";
import { TUser } from "@/types/user";
import { useSearchParams } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ErrorUi = ({ error }: { error: any }) => {
  return (
    <tr>
      <td></td>
      <td className="flex justify-center py-10">
        {"status" in error &&
          error?.data &&
          typeof error.data === "object" &&
          "errorMessage" in error.data ? (
          <p>{(error.data as { errorMessage: string }).errorMessage}</p>
        ) : (
          <p>Something went wrong.</p>
        )}
      </td>
      <td></td>
      <td></td>
    </tr>
  );
};

export const LoadingUi = () => {
  return (
    <tr>
      <td></td>
      <td className=" flex justify-center">
        <ThreeDots
          visible={true}
          height="80"
          width="60"
          color="#4b5563"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </td>
      <td></td>
      <td></td>
    </tr>
  );
};

const TeamPage = () => {
  // Roles state
  const searchParams = useSearchParams();
  const page = searchParams.get('page')
  const { data, isLoading, error, isError } = useGetTeamMemberQuery({ page }, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

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
    <div className="bg-white min-h-screen">
      <div className="px-6 sticky z-50 top-0 py-3 bg-white flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Team</h1>
        <div className=" flex gap-x-3">
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
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Email</th>
                  <th className="p-3 border-b">Role</th>
                  <th className="p-3 border-b text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isError && <ErrorUi error={error} />}
                {isLoading && <LoadingUi />}
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
          </div>
          <div className="mt-5">
            <PaginationWithLinks page={meta?.page as number} pageSize={meta?.limit as number} totalCount={meta?.total as number} />
          </div>

        </section>
      </div>
    </div>
  );
};

export default TeamPage;
