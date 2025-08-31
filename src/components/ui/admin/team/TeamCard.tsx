import { TUser } from "@/types/user";
import React from "react";
import DeleteTeamMember from "./DeleteTeamMember";
interface IProps {
    member: TUser
}

const TeamCard = (props : IProps ) => {
  const {member} = props
  return (
    <tr className="hover:bg-gray-50 transition duration-150">
      <td className="p-3 font-medium text-gray-800">{member.name}</td>
      <td className="p-3 text-gray-600">{member.email}</td>
      <td className="p-3 text-gray-600">{member.role}</td>
      <td className="p-3 text-right space-x-3">
        {
          member.role !== "super" &&  <DeleteTeamMember email={member.email} />
        }
      </td>
    </tr>
  );
};

export default TeamCard;
