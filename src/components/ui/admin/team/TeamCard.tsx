import { TUser } from "@/types/user";
import React from "react";
import DeleteTeamMember from "./DeleteTeamMember";

interface IProps {
  member: TUser;
}

const TeamCard = (props: IProps) => {
  const { member } = props;

  return (
    <tr className="hover:bg-gray-50 transition duration-150">
      <td className="p-3 font-medium text-gray-800">{member.name}</td>
      <td className="p-3 text-gray-600">{member.email}</td>
      
      {/* Role column with dropdown */}
      <td className="p-3 text-gray-600 capitalize">
        {member.role === "super" ? (
          member.role
        ) : (
          <select
            value={member.role}
            className="border rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring focus:ring-indigo-500"
          >
            <option value={member.role}>{member.role}</option>
            {member.role === "admin" && <option value="manager">manager</option>}
            {member.role === "manager" && <option value="admin">admin</option>}
          </select>
        )}
      </td>

      <td className="p-3 text-right space-x-3 flex items-center justify-end">
        {/* Delete Button */}
        {member.role !== "super" && <DeleteTeamMember email={member.email} />}
      </td>
    </tr>
  );
};

export default TeamCard;
