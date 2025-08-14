"use client";
import AddTeamMemberModal from "@/components/ui/admin/team/AddTeamMember";

import DeleteTeamMember from "@/components/ui/admin/team/DeleteTeamMember";
import { useGetTeamMemberQuery } from "@/redux/features/auth/authApi";
import { TUser } from "@/types/user";
import { ThreeDots } from "react-loader-spinner";

const TeamPage = () => {
  // Roles state

  const { data, isLoading, error, isError } = useGetTeamMemberQuery({
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const teamMember = data?.data;

  // Team handlers
  const handleAddMember = () => alert("Add Team Member form here");

  return (
    <div className="bg-white min-h-screen">
      <div className="px-6 sticky top-0 py-3 bg-white flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Team</h1>
        <div className=" flex gap-x-3">
          <AddTeamMemberModal
            roles={["admin", "manager"]}
            onAdd={handleAddMember}
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
                {isError && (
                  <tr>
                    <td></td>
                    <td className="flex justify-center py-10">
                      {"status" in error &&
                      error?.data &&
                      typeof error.data === "object" &&
                      "errorMessage" in error.data ? (
                        <p>
                          {
                            (error.data as { errorMessage: string })
                              .errorMessage
                          }
                        </p>
                      ) : (
                        <p>Something went wrong.</p>
                      )}
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                )}
                {isLoading && (
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
                )}
                {teamMember?.map((member: TUser) => (
                  <tr
                    key={member._id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="p-3 font-medium text-gray-800">
                      {member.name}
                    </td>
                    <td className="p-3 text-gray-600">{member.email}</td>
                    <td className="p-3 text-gray-600">{member.role}</td>
                    <td className="p-3 text-right space-x-3">
                      <DeleteTeamMember />
                    </td>
                  </tr>
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
        </section>
      </div>
    </div>
  );
};

export default TeamPage;
